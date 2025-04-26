const createError = require( 'http-errors' );

// 404 not found
function notFoundHandler ( req, res, next )
{
//   const error = new Error('Not Found');
//   error.status = 404;
    //   next(error);
    next( createError( 404, "Requested url is not available!!! ❌" ) );
}

// deafult error handler
function errorHandlers(error, req, res, next)
{
    //   res.status(err.status || 500);
    //   res.render('error', { error: err });
    // const error = req.app.get( 'env' ) === 'development' ? req.error : {};
    // res.status( error.status || 500 );
    // res.json( {
    //     status: error.status || 500,
    //     message: error.message || "Internal Server Error",
    //     stack: req.app.get( 'env' ) === 'development' ? error.stack : {},
    // } );


    // res.json( {
    //     status: res.statusCode || 500,
    //     message: res.message || "Internal Server Error",
    //     stack: req.app.get( 'env' ) === 'development' ? error.stack : {},
    // } );

    // html response
    res.render( 'error', {
        title: "Error page",
        status: res.statusCode || 500,
        message: res.message || error.message || "Internal Server Error",
        stack: req.app.get( 'env' ) === 'development' ? error.stack : {},
    } );
}

module.exports = {
    notFoundHandler,
    errorHandlers,
};