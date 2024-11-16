"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const stepRoutes_1 = __importDefault(require("./routes/stepRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const questionRoutes_1 = __importDefault(require("./routes/questionRoutes"));
const testRoutes_1 = __importDefault(require("./routes/testRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)('combined'));
// Routes with middleware
app.use('/api/steps', authMiddleware_1.authenticateToken, stepRoutes_1.default);
app.use('/api/auth', userRoutes_1.default);
app.use('/api/questions', authMiddleware_1.authenticateToken, questionRoutes_1.default); // Register question routes with middleware
app.use('/api', authMiddleware_1.authenticateToken, testRoutes_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
