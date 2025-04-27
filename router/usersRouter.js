const express = require( 'express' );
const { getUsers } = require( '../controller/usersController' );
const decorateHtml = require( '../middlewares/common/decorateHtmlRes' );

const router = express.Router();

router.get( '/', decorateHtml("Users Page") ,getUsers );

module.exports = router;