const express = require( 'express' );
const { getLogin } = require( '../controller/loginController' );
const decorateHtml = require( '../middlewares/common/decorateHtmlRes' );

const router = express.Router();

router.get('/', decorateHtml("Login Page"), getLogin);

module.exports = router;