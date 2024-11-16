"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
// Function to handle user login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('loginUser function hit');
    const { email, password } = req.body;
    try {
        console.log('Login attempt:', { email }); // Log the login attempt
        const result = yield dbConfig_1.default.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (!user) {
            console.log('User not found');
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid password');
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        // Ensure the correct field is used for user ID in the JWT payload
        const token = jsonwebtoken_1.default.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Login successful:', { email: user.email }); // Log successful login
        res.status(200).json({ token, user });
    }
    catch (err) {
        console.error('Error logging in user', err);
        res.status(500).json({ message: 'Error logging in user' });
    }
});
exports.loginUser = loginUser;
// Function to handle user registration
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('registerUser function hit');
    const { username, email, password } = req.body;
    try {
        console.log('Hashing password');
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        console.log('Password hashed:', hashedPassword);
        console.log('Inserting user into database');
        const currentTime = new Date().toISOString();
        const result = yield dbConfig_1.default.query('INSERT INTO users (username, email, password, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5) RETURNING *', [username, email, hashedPassword, currentTime, currentTime]);
        const newUser = result.rows[0];
        console.log('User inserted:', newUser);
        res.status(201).json({ user: newUser });
    }
    catch (err) {
        console.error('Error registering user', err);
        res.status(500).json({ message: 'Error registering user' });
    }
});
exports.registerUser = registerUser;
