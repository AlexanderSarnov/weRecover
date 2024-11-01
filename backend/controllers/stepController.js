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
exports.deleteStep = exports.updateStep = exports.getSteps = exports.createStep = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
// Create a new recovery step
const createStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, stepName, description, date, time } = req.body;
    try {
        const result = yield dbConfig_1.default.query('INSERT INTO steps (user_id, step_name, description, date, time) VALUES ($1, $2, $3, $4, $5) RETURNING *', [userId, stepName, description, date, time]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error creating step:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createStep = createStep;
// Get all recovery steps for a user with pagination
const getSteps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
    const offset = (parseInt(page) - 1) * parseInt(limit);
    try {
        const result = yield dbConfig_1.default.query('SELECT * FROM steps WHERE user_id = $1 ORDER BY date DESC, time DESC LIMIT $2 OFFSET $3', [userId, parseInt(limit), offset]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error('Error fetching steps:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getSteps = getSteps;
// Update a recovery step
const updateStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stepId } = req.params;
    const { stepName, description, date, time } = req.body;
    try {
        const result = yield dbConfig_1.default.query('UPDATE steps SET step_name = $1, description = $2, date = $3, time = $4, updated_at = CURRENT_TIMESTAMP WHERE step_id = $5 RETURNING *', [stepName, description, date, time, stepId]);
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error updating step:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateStep = updateStep;
// Delete a recovery step
const deleteStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stepId } = req.params;
    try {
        yield dbConfig_1.default.query('DELETE FROM steps WHERE step_id = $1', [stepId]);
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting step:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteStep = deleteStep;
