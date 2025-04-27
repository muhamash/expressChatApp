function decorateHtml(title) {
    return ( req, res, next ) =>
    {
        res.locals.html = true;
        res.locals.title = title;
        next();
    };
}

module.exports = decorateHtml;