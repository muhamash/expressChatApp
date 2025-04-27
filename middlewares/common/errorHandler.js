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
    // res.status( error.status || 500 );
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
    // res.locals.title = "Error page"; //can set title like this
    // res.render( 'error', {
    //     // title: "Error page",
    //     status: res.statusCode || 500,
    //     message: res.message || error.message || "Internal Server Error",
    //     stack: req.app.get( 'env' ) === 'development' ? error.stack : {},
    // } );

    res.locals.error =
    process.env.NODE_ENV === "development" ? error : { message: error.message };

    res.status( error.status || 500 );

    if (req.accepts('html')) {
        res.render('error', {
            title: "Error page",
            status: error.status || 500,
            message: error.message || "Internal Server Error",
            stack: req.app.get('env') === 'development' ? error.stack : '',
        });
    }
    else if ( req.accepts( 'json' ) )
    {
        res.json({
            status: error.status || 500,
            message: error.message || "Internal Server Error",
        });
    }
    else
    {
        res.type('txt').send('Error: ' + (error.message || "Internal Server Error"));
    }
    
}

module.exports = {
    notFoundHandler,
    errorHandlers,
};