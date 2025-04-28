const express = require( 'express' );
const { getLogin, postLogin } = require( '../controller/loginController' );
const decorateHtml = require( '../middlewares/common/decorateHtmlRes' );

const router = express.Router();

router.get( '/', decorateHtml( "Login Page" ), getLogin );

router.post( '/', postLogin );

module.exports = router;