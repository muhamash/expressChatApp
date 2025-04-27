function getLogin(req, res, next) {
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

module.exports = {
    getLogin,
}