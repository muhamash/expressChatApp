function decorateHtml(title) {
    return ( req, res, next ) =>
    {
        res.locals.html = true;
        res.locals.title = title;
        res.locals.loggedInUser = {};
        res.locals.errors = {};
        res.locals.data = {
            // username: req.body.username,
        };

        next();
    };
}

module.exports = decorateHtml;