const express = require( 'express' );
const { getUsers, addUser } = require( '../controller/usersController' );
const decorateHtml = require( '../middlewares/common/decorateHtmlRes' );
const avatarUpload = require( '../middlewares/users/userAvatarUpload' );
const { userValidators, userValidationHandler } = require( '../middlewares/users/userValidators' );

const router = express.Router();

router.get( '/', decorateHtml( "Users Page" ), getUsers );

router.post( '/', avatarUpload, userValidators, userValidationHandler, addUser );
  
module.exports = router; 