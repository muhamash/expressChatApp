function getInbox(req, res, next) {
    const conversations = []; // or fetch from DB if needed
    const loggedInUser = req.user || null; // assuming you're attaching user info via middleware

    if (req.accepts('html')) {
        res.render('inbox', {
            data: Array.isArray(conversations) ? conversations : [],
            loggedInUser: loggedInUser || { userid: null, username: "Guest" }
        });
    } else if (req.accepts('json')) {
        res.json({
            message: "This route is meant for HTML form Inbox.",
        });
    } else {
        res.type('txt').send('This route is for Inbox.');
    }
}

module.exports = {
    getInbox,
}