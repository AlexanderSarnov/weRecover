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
exports.getTestQuestions = exports.updateAnswer = exports.getAnswers = exports.addAnswer = exports.getQuestions = exports.addQuestion = exports.getQuestionsForStep = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
// Get all questions for a specific step, including user-specific questions and their answers
const getQuestionsForStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { step_id } = req.params;
    const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id; // Extract the user ID from the authenticated user
    try {
        const result = yield dbConfig_1.default.query(` SELECT q.*, json_agg(a.*) AS answers FROM questions q LEFT JOIN answers a ON q.question_id = a.question_id AND a.user_id = $2 WHERE q.step_id = $1 AND (q.is_flagged = FALSE OR q.user_id = $2) GROUP BY q.question_id ORDER BY q.question_id; `, [step_id, user_id]);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error querying the database', error);
        res.status(500).json({ message: 'Error querying the database' });
    }
});
exports.getQuestionsForStep = getQuestionsForStep;
// Add a new question to a specific step
const addQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { step_id } = req.params;
    const { question_text } = req.body;
    const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id; // Extract the user ID from the authenticated user
    const is_custom = true; // Ensure the question is marked as custom
    try {
        const newQuestion = yield dbConfig_1.default.query('INSERT INTO questions (step_id, user_id, question_text, is_custom) VALUES ($1, $2, $3, $4) RETURNING *', [step_id, user_id, question_text, is_custom]);
        res.json(newQuestion.rows[0]);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.addQuestion = addQuestion;
// Get all non-flagged questions for a specific step
const getQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { step_id } = req.params;
    try {
        const questions = yield dbConfig_1.default.query('SELECT * FROM questions WHERE step_id = $1 AND is_flagged = FALSE', [
            step_id,
        ]);
        res.json(questions.rows);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.getQuestions = getQuestions;
// Add a new answer to a specific question
const addAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { question_id } = req.params;
    const { answer_text } = req.body;
    const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id; // Extract the user ID from the authenticated user
    try {
        const newAnswer = yield dbConfig_1.default.query('INSERT INTO answers (question_id, user_id, answer_text) VALUES ($1, $2, $3) RETURNING *', [question_id, user_id, answer_text]);
        res.json(newAnswer.rows[0]);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.addAnswer = addAnswer;
// Get answers for a specific question, related to the current user
const getAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { question_id } = req.params;
    const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id; // Extract the user ID from the authenticated user
    try {
        const answers = yield dbConfig_1.default.query('SELECT * FROM answers WHERE question_id = $1 AND user_id = $2', [
            question_id,
            user_id,
        ]);
        res.json(answers.rows);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.getAnswers = getAnswers;
// Update an existing answer for a specific question
const updateAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { question_id, answer_id } = req.params;
    const { answer_text } = req.body;
    const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id; // Extract the user ID from the authenticated user
    try {
        const result = yield dbConfig_1.default.query('UPDATE answers SET answer_text = $1 WHERE question_id = $2 AND answer_id = $3 AND user_id = $4 RETURNING *', [answer_text, question_id, answer_id, user_id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Answer not found' });
        }
        else {
            res.json(result.rows[0]);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.updateAnswer = updateAnswer;
// Test function to get all questions for a specific step
const getTestQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { step_id } = req.params;
    try {
        const result = yield dbConfig_1.default.query('SELECT * FROM questions WHERE step_id = $1', [step_id]);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error querying the database', error);
        res.status(500).json({ message: 'Error querying the database' });
    }
});
exports.getTestQuestions = getTestQuestions;
