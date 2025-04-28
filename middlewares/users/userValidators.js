const { check, validationResult } = require( 'express-validator' );
const User = require( '../../models/users' );
const path = require( 'path' );
const createError = require( 'http-errors' );
const { unlink } = require( 'fs' );

const userValidators = [
    check( 'name' ).isLength( { min: 1 } ).isAlpha( 'en-US', { ignore: "-" } ).withMessage( "Name field is required and must contain alphabet" ).trim(),
    check( 'email' ).isEmail().withMessage( "Invalid email address" ).trim().custom( async ( value ) =>
    {
        try
        {
            const user = await User.findOne( { email: value } );
            if ( user )
            {
                throw createError( 409, "Email already in use" );
            }
        }
        catch ( error )
        {
            throw createError( 500, error.message );
        }
    } ),
    check( 'mobile' ).isMobilePhone( 'bn-BD', { strictMode: true } ).withMessage( "Invalid Bangladeshi mobile number" ).trim().custom( async ( value ) =>
    {
        try
        {
            const user = await User.findOne( { mobile: value } );
            if ( user )
            {
                throw createError( 409, "Mobile number already in use" );
            }
        }
        catch ( error )
        {
            throw createError( 500, error.message );
        }
    }
    ),
    check( 'password' ).isLength( { min: 6 } ).withMessage( "Password must be at least 6 characters long" ).trim()
];

const userValidationHandler = ( req, res, next ) =>
{
    const errors = validationResult( req );
    const mappedErrors = errors.mapped();
    // console.log( "Mapped Errors: ", mappedErrors );

    if(Object.keys( mappedErrors ).length === 0)
    {
        next();
    }
    else
    {
        // delete the file
        if ( req.files.length > 0 )
        {
            const { filename } = req.files[ 0 ];
            unlink( path.join(`${__dirname}/../public/uploads/avatars/${filename}`), ( err ) =>
            {
                if ( err )
                {
                    console.log( "Error deleting file: ", err );
                    console.error( err );
                }
            } );
        }

        return res.status( 400 ).json( {
            errors: mappedErrors,
        } );
    }
}

module.exports = { userValidators, userValidationHandler };