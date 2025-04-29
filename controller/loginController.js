const User = require( '../models/users' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const createError = require( 'http-errors' );

function getLogin ( req, res, next )
{
    if (req.accepts('html')) {
        res.render( 'index');
    }
    else if (req.accepts('json')) {
        res.json({
            message: "This route is meant for HTML form login.",
        });
    }
    else {
        res.type('txt').send('This route is for login.');
    }
}

async function postLogin ( req, res, next )
{ 
    try
    {
        const user = await User.findOne( {
            $or: [ { email: req.body.username }, { mobile: req.body.username } ],
        } );
        
        console.log( "User: ", user );
        if ( user && user._id )
        {
            const isValidPassword = await bcrypt.compare( req.body.password, user.password );

            if(isValidPassword)
            {
                // set cookie
                // res.cookie( 'userId', user._id, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true } );
                // res.redirect( '/inbox' );
                const userObject = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    role: user.role,
                }

                // token generation
                const token = await jwt.sign( userObject, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION } );
                // console.log( "Token: ", token );
                 
                // set cookie
                res.cookie( process.env.COOKIE_NAME, token, { maxAge: process.env.JWT_EXPIRATION, httpOnly: true, signed: true } );

                res.locals.loggedInUser = userObject;

                res.render( 'inbox' );
            }
            else
            {
                throw createError( 401, "Invalid username or password" );
            }
        }
        else
        {
            throw createError( 401, "Login Failed!!" );
        }
    }
    catch (err) {
        res.render( "index", {
            data: {
                username: req.body.username,
            },
            errors: {
                common: {
                    msg: err.message,
                },
            },
        } );
    };
}; 

function logout ( req, res, next )
{
    res.clearCookie( process.env.COOKIE_NAME );
    res.send('logged out');
}

module.exports = {
    getLogin,
    postLogin,
    logout,
}