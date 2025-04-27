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

module.exports = {
    getUsers,
}