const bycrypt = require( 'bcrypt' );
const { unlink } = require( 'fs' );
const path = require( 'path' );
const { User } = require( '../models/users' );

async function getUsers ( req, res, next )
{
    try
    {
        const users = await User.find();
        console.log( users );

        if (req.accepts('html')) {
            res.render( 'users', { users });
        }
        else if (req.accepts('json')) {
            res.json({
                message: "This route is meant for Users.",
                users,
            });
        }
        else {
            res.type( 'txt' ).send( `This route is for Users`, JSON.stringify( users ) );
        }

    } catch ( error )
    {
        next( error );
    }
}

async function addUser ( req, res, next )
{
    let newUser;
    const hashedPassword = await bcrypt.hash( req.body.password, 10 );

    if (req.files && req.files.length > 0) {
        newUser = new User( {
            ...req.body,
            avatar: req.files[ 0 ]?.filename || "",
            password: hashedPassword,
        } );
    }
    else
    {
        newUser = new User( {
            ...req.body,
            password: hashedPassword,
        } );
    };

    try
    {
        const result = await newUser.save();

        if (req.accepts('html')) {
            const users = await User.find();
            res.render('users', { users });
        }
        else if ( req.accepts( 'json' ) )
        {
            res.status( 200 ).json( {
                message: "User was added successfully!",
                data: result,
            } );
        }
        else
        {
            res.type( 'txt' ).send( json.stringify( {
                message: "User was added successfully!",
                data: result,
            } ) );
        }
    }
    catch ( error )
    {
        res.status( 500 ).json( {
            errors: {
                common: {
                    message: "Unknown error occurred!",
                },
                message: error?.message || error?.toString(),
            },
        } );
        next( error );
    }
};

async function deleteUser ( req, res, next )
{
    const userId = req.param?.id;
    try
    {
        const user = await User.findByIdAndDelete( { _id: userId } );
        // console.log( user );

        if (user?.avatar) {
            unlink(
                path.join( __dirname, `/../public/uploads/avatars/${user.avatar}` ),
                ( err ) =>
                {
                    if ( err ) console.log( err );
                }
            );
        };

        if(req.accepts('html')) {
            // const users = await User.find();
            res.render( 'index' );
        }
        else if( req.accepts( 'json' ) )
        {
            res.status( 200 ).json( {
                message: "User was deleted successfully!",
                userId,
            } );
        }
        else
        {
            res.type( 'txt' ).send( json.stringify( {
                message: "User was deleted successfully!",
                userId,
            } ) );
        }
    }
    catch ( error )
    {
        res.status( 500 ).json( {
            errors: {
                common: {
                    message: "Can't delete the user!",
                },
                message: error?.message || error?.toString(),
            },
        } );
        next( error );
    }
}

module.exports = {
    getUsers,
    addUser,
    deleteUser
}