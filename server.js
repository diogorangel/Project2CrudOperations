// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db/connection');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy; 
require('dotenv').config();

// FIX 1: REQUIRED DEPENDENCIES ARE HERE (session and cors)
const session = require('express-session');
const cors = require('cors'); 


// Adicione as bibliotecas do Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Importe o arquivo de especificação

const app = express();
const port = process.env.PORT || 3000;

connectDB();

// --- MIDDLEWARE ---
app.use(bodyParser.json());

// Session and Passport Middleware (must be first)
app.use(session({ 
    secret: process.env.SESSION_SECRET || "default_secret", // ✅ SECURITY IMPROVEMENT: Use env variable for secret
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// CORS Middleware (simplifies custom header logic below)
app.use(cors());

// Custom Header Middleware - Keep if needed, but 'cors()' often makes it redundant
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'POST, GET, PUT, PATCH, OPTIONS, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
    next();
});

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// --- PASSPORT CONFIGURATION ---
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
    // In a real app, you would look up or create the user here
    return done(null, profile);
}));  

passport.serializeUser(function(user, done){
    // We serialize the user's GitHub ID or your database ID
    done(null, user.id); 
});

passport.deserializeUser(function(id, done){
    // FIX 2: Passport's deserialize signature is (id, done). The error 'err'
    // in your original code was likely an undefined variable. 
    // This is a placeholder; replace 'null' with your actual Mongoose User model query:
    // User.findById(id, function(err, user){ done(err, user); });
    
    // Using done(null, user) where user is retrieved from DB by ID.
    done(null, { id: id, displayName: 'Placeholder User' }); 
});

// --- PRIMARY ROUTES ---

// 1. GitHub Auth Routes
app.get('/login', passport.authenticate('github', { scope: ['user:email'] })); // Add scope for better auth flow

// FIX 3: GitHub Callback Route (Corrected to /auth/github/callback)
app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs'}),
    (req,res) => {
        // req.user is set by Passport upon successful authentication
        req.session.user = req.user;
        res.redirect('/');
    }
);

app.get('/logout', (req, res, next) => {
    // Clear session and redirect
    req.session.destroy((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

// 2. Base Index Route (Shows login status)
app.get('/', (req, res) => {
    res.send(req.session.user !== undefined 
        ? `Logged in as ${req.session.user.displayName}. <a href="/logout">Logout</a>` 
        : `Logged out. <a href="/login">Login with GitHub</a>`);
});

// 3. Application Routers
// FIX 4: Explicitly mount routers at their intended base paths 
// (e.g., '/authors' routes start with /authors, not just /)
app.use('/authors', require('./routes/authors'));
app.use('/books', require('./routes/books'));
// The users router (if needed for API endpoints) is also mounted here
app.use('/users', require('./routes/users')); 


// --- SERVER START ---
console.log("Database initialized");
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});