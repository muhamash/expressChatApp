function getUsers(req, res, next) {
    if (req.accepts('html')) {
        res.render( 'users');
    }
    else if (req.accepts('json')) {
        res.json({
            message: "This route is meant for HTML form Users.",
        });
    }
    else {
        res.type('txt').send('This route is for Users.');
    }
}

module.exports = {
    getUsers,
}