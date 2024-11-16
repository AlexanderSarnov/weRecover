"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questionController_1 = require("../controllers/questionController");
const authMiddleware_1 = require("../middleware/authMiddleware"); // Import the middleware
const router = express_1.default.Router();
router.get('/test-questions/:step_id', authMiddleware_1.authenticateToken, questionController_1.getTestQuestions); // Add the middleware to the route
exports.default = router;
