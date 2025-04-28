const uploader = require( "../../utils/singleUploader" );

function avatarUpload(req, res, next) {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpg, jpeg or .png format allowed!"
  );

  // call the middleware function
    upload.any()( req, res, ( err ) =>
    {
        // console.log( "req.files: ", req.files );
        if ( err )
        {
            res.status( 500 ).json( {
                errors: {
                    avatar: {
                        message: err.message,
                    },
                    message: err?.message || err?.toString(),
                },
            } );
        }
        else
        {
            next();
        }
    } );
}

module.exports = avatarUpload;