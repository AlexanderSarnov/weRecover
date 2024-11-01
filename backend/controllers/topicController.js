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
exports.getTopics = exports.createTopic = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
// Create a new topic
const createTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { topicName, description } = req.body;
    try {
        const result = yield dbConfig_1.default.query('INSERT INTO topics (topic_name, description, date) VALUES ($1, $2, CURRENT_DATE) RETURNING *', [topicName, description]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error creating topic:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createTopic = createTopic;
// Get all topics
const getTopics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dbConfig_1.default.query('SELECT * FROM topics ORDER BY date DESC');
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error('Error fetching topics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getTopics = getTopics;
