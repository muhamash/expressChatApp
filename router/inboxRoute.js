const express = require( 'express' );
const { getInbox } = require( '../controller/inboxController' );
const decorateHtml = require( '../middlewares/common/decorateHtmlRes' );

const router = express.Router();

router.get( '/', decorateHtml("Inbox Page") ,getInbox );

module.exports = router;