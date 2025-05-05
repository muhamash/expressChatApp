const express = require( 'express' );
const { getInbox } = require( '../controller/inboxController' );
const decorateHtml = require( '../middlewares/common/decorateHtmlRes' );
const { checkLogin } = require( '../middlewares/common/checkLogin' );

const router = express.Router();

router.get( '/', decorateHtml( "Inbox Page" ),checkLogin, getInbox );

module.exports = router;