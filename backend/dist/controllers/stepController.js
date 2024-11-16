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
exports.handleStepProgress = exports.getSteps = exports.getStepProgress = exports.getStepDetails = exports.getAllStepsProgress = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
// Get All Steps Progress
const getAllStepsProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Ensure the user ID is correctly extracted
    try {
        const result = yield dbConfig_1.default.query('SELECT * FROM step_progress WHERE user_id = $1', [userId]);
        const progress = result.rows;
        if (progress.length === 0) {
            res.status(404).json({ message: 'No progress found for the user' });
            return;
        }
        res.json(progress);
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
exports.getAllStepsProgress = getAllStepsProgress;
// Get Step Details
const getStepDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const stepId = req.params.step_id;
    try {
        // Fetch step details
        const stepResult = yield dbConfig_1.default.query('SELECT * FROM steps WHERE step_id = $1', [stepId]);
        const step = stepResult.rows[0];
        if (!step) {
            res.status(404).json({ message: 'Step not found' });
            return;
        }
        // Fetch related questions
        const questionsResult = yield dbConfig_1.default.query('SELECT * FROM questions WHERE step_id = $1', [stepId]);
        const questions = questionsResult.rows;
        // Fetch step status
        const statusResult = yield dbConfig_1.default.query('SELECT status FROM step_progress WHERE step_id = $1 AND user_id = $2', [
            stepId,
            req.user.id,
        ]);
        const status = ((_a = statusResult.rows[0]) === null || _a === void 0 ? void 0 : _a.status) || 'Not Started';
        res.status(200).json({ step, questions, status });
    }
    catch (err) {
        console.error('Error retrieving step details', err);
        res.status(500).json({ message: 'Error retrieving step details' });
    }
});
exports.getStepDetails = getStepDetails;
// Get Step Progress
const getStepProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { step_id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // Ensure the user ID is correctly extracted
    console.log('Fetching progress for step_id:', step_id, 'and user_id:', userId); // Log the step_id and user_id
    try {
        const result = yield dbConfig_1.default.query('SELECT * FROM step_progress WHERE step_id = $1 AND user_id = $2', [
            step_id,
            userId,
        ]);
        const progress = result.rows;
        if (progress.length === 0) {
            res.status(404).json({ message: 'Progress not found' });
            return;
        }
        res.json(progress);
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
exports.getStepProgress = getStepProgress;
// Get Steps
const getSteps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dbConfig_1.default.query('SELECT * FROM steps');
        res.json(result.rows);
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
exports.getSteps = getSteps;
// Handle Step Progress
const handleStepProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { step_id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // Ensure the user ID is correctly extracted
    const { status } = req.body;
    try {
        // Check if progress already exists
        const checkResult = yield dbConfig_1.default.query('SELECT * FROM step_progress WHERE user_id = $1 AND step_id = $2', [
            userId,
            step_id,
        ]);
        const existingProgress = checkResult.rows[0];
        if (existingProgress) {
            // Update existing progress
            const updateResult = yield dbConfig_1.default.query('UPDATE step_progress SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE progress_id = $2 RETURNING *', [status, existingProgress.progress_id]);
            const updatedProgress = updateResult.rows[0];
            res.status(200).json(updatedProgress);
        }
        else {
            // Add new progress
            const insertResult = yield dbConfig_1.default.query('INSERT INTO step_progress (user_id, step_id, status) VALUES ($1, $2, $3) RETURNING *', [userId, step_id, status]);
            const newProgress = insertResult.rows[0];
            res.status(201).json(newProgress);
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
exports.handleStepProgress = handleStepProgress;
