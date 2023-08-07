const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    helpers
});
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Session configuration
const sess = {
    secret: 'Super secret secret', // Secret key used to sign the session ID cookie
    cookie: {
        maxAge: 300000, // The maximum age of the session, in milliseconds (5 minutes in this case)
        httpOnly: true, // The cookie is accessible only by the server and not by JavaScript on the client side
        secure: false, // Set to 'false' for development environment, 'true' for production with HTTPS
        sameSite: 'strict', // Controls when the cookie is sent to the server ('strict' ensures the cookie is sent only for same-site requests)
    },
    resave: false, // Do not automatically save the session after each request
    saveUninitialized: true, // Save a session that is new but not modified
    store: new SequelizeStore({ // Using SequelizeStore to store session data in the database through Sequelize
        db: sequelize // The Sequelize instance for the database connection
    })
};

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for handling sessions
app.use(session(sess));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming JSON data
app.use(express.json());

// Parse incoming form data
app.use(express.urlencoded({ extended: true }));

// Set up routes from the 'controllers' directory
app.use(routes);

// Sync the Sequelize models and start the server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
});
