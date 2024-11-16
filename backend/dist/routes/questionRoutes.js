"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questionController_1 = require("../controllers/questionController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/:step_id/questions', authMiddleware_1.authenticateToken, questionController_1.addQuestion); // Add a question to a step
router.get('/:step_id/questions', authMiddleware_1.authenticateToken, questionController_1.getQuestionsForStep); // Get all questions for a specific step
router.post('/:question_id/answers', authMiddleware_1.authenticateToken, questionController_1.addAnswer); // Add an answer to a question
router.put('/:question_id/answers/:answer_id', authMiddleware_1.authenticateToken, questionController_1.updateAnswer); // Update an existing answer for a question
router.get('/:question_id/answers', authMiddleware_1.authenticateToken, questionController_1.getAnswers); // Get all answers for a specific question
exports.default = router;
