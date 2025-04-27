function getInbox(req, res, next) {
    if (req.accepts('html')) {
        res.render( 'inbox');
    }
    else if (req.accepts('json')) {
        res.json({
            message: "This route is meant for HTML form Inbox.",
        });
    }
    else {
        res.type('txt').send('This route is for Inbox.');
    }
}

module.exports = {
    getInbox,
}