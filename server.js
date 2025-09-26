// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db/connection');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy; 
require('dotenv').config();

// REQUIRED DEPENDENCIES 
const session = require('express-session');
const cors = require('cors'); 

// 🎯 FIX: Adicionando a dependência do MongoDB Session Store
const MongoDBStore = require('connect-mongodb-session')(session); // <-- NOVO REQUIRE

// Adicione as bibliotecas do Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Importe o arquivo de especificação

const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI; // <-- NOVO: Definindo a URI para o Store

// Configuração do Session Store
const store = new MongoDBStore({ // <-- NOVO: Configurando o Store
    uri: MONGODB_URI,
    collection: 'userSessions', // Nome da coleção no seu DB onde as sessões serão armazenadas
});

// Tratamento de erros do Store
store.on('error', function(error) {
    console.log('MongoDB Session Store Error:', error);
});


connectDB();

// --- MIDDLEWARE ---
app.use(bodyParser.json());

// Session and Passport Middleware (AGORA PERSISTENTE NO MONGO)
app.use(session({ 
    secret: process.env.SESSION_SECRET || "default_secret", 
    resave: false,
    saveUninitialized: false, // Alterado para 'false' para economizar no DB
    store: store, // <-- AQUI É A MUDANÇA PRINCIPAL
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 semana (opcional, mas recomendado)
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// ... (Restante do seu código permanece igual)

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
    // This is a placeholder; replace 'null' with your actual Mongoose User model query:
    // User.findById(id, function(err, user){ done(err, user); });
    done(null, { id: id, displayName: 'Placeholder User' }); 
});

// --- PRIMARY ROUTES ---

// 1. GitHub Auth Routes
app.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

// FIX 3: GitHub Callback Route (Corrected to /auth/github/callback)
app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs'}),
    (req,res) => {
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
app.use('/authors', require('./routes/authors'));
app.use('/books', require('./routes/books'));
app.use('/users', require('./routes/users')); 


// --- SERVER START ---
console.log("Database initialized");
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});