const express = require( 'express' );
const { getLogin, postLogin, logout } = require( '../controller/loginController' );
const decorateHtml = require( '../middlewares/common/decorateHtmlRes' );
const { loginValidators, loginValidationHandler } = require( '../middlewares/login/loginValidators' );
const { redirectLoggedIn, redirectIfLoggedIn } = require( '../middlewares/common/checkLogin' );

const router = express.Router();

// console.log( redirectLoggedIn );

router.get( '/', decorateHtml( "Login Page" ), redirectIfLoggedIn, getLogin );

router.post( '/', decorateHtml( "Login Page" ), loginValidators, loginValidationHandler, postLogin );

router.delete('/', logout);

module.exports = router;