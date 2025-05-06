const express = require( 'express' );
const { getLogin, postLogin, logout } = require( '../controller/loginController' );
const decorateHtml = require( '../middlewares/common/decorateHtmlRes' );
const { loginValidators, loginValidationHandler } = require( '../middlewares/login/loginValidators' );
const { redirectLoggedIn } = require( '../middlewares/common/checkLogin' );

const router = express.Router();

router.get( '/', decorateHtml( "Login Page" ), redirectLoggedIn, getLogin );

router.post( '/', decorateHtml( "Login Page" ), loginValidators, loginValidationHandler, postLogin );

router.delete('/', logout);

module.exports = router;