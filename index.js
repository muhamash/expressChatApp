const express = require( 'express' );
const dotenv = require( 'dotenv' );
const mongoose = require( 'mongoose' );
const path = require( 'path' );
const cookieParser = require( 'cookie-parser' );
const { notFoundHandler, errorHandlers } = require( './middlewares/common/errorHandler' );
const loginRouter = require( './router/loginRouter' );
const inboxRouter = require( './router/inboxRoute' );
const usersRouter = require( './router/usersRouter' );

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
mongoose.connect( process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} ).then( () =>
{
    console.log( 'MongoDB connected 🎃' );
} ).catch( ( err ) =>
{
    console.error( 'MongoDB connection error:', err );
} );

// request parser
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

// view engine
app.set( 'view engine', 'ejs' );

// static files and cookie parser
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use( cookieParser( process.env.COOKIE_SECRET ) );

// routes
app.use( '/', loginRouter );
app.use( '/users', usersRouter );
app.use( '/inbox', inboxRouter );

// 404 not found handler
app.use( notFoundHandler );

// error handling
app.use( errorHandlers );

app.listen( port, () =>
{
    console.log( `Server running on port ${port} 🔥` )
} ); 