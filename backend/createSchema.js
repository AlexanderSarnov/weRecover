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
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const createTables = () => __awaiter(void 0, void 0, void 0, function* () {
    const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(100) NOT NULL
    );`;
    const createStepsTable = `
    CREATE TABLE IF NOT EXISTS steps (
      step_id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(user_id),
      step_name VARCHAR(100) NOT NULL,
      description TEXT,
      date DATE DEFAULT CURRENT_DATE,
      time TIME DEFAULT CURRENT_TIME,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
    const createTopicsTable = `
    CREATE TABLE IF NOT EXISTS topics (
      topic_id SERIAL PRIMARY KEY,
      topic_name VARCHAR(100) NOT NULL,
      description TEXT,
      date DATE DEFAULT CURRENT_DATE
    );`;
    const createCommentsTable = `
    CREATE TABLE IF NOT EXISTS comments (
      comment_id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(user_id),
      topic_id INT REFERENCES topics(topic_id),
      comment_text TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
    const createJournalEntriesTable = `
    CREATE TABLE IF NOT EXISTS journal_entries (
      entry_id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(user_id),
      entry_text TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
    yield dbConfig_1.default.query(createUsersTable);
    yield dbConfig_1.default.query(createStepsTable);
    yield dbConfig_1.default.query(createTopicsTable);
    yield dbConfig_1.default.query(createCommentsTable);
    yield dbConfig_1.default.query(createJournalEntriesTable);
    console.log('Tables created successfully');
});
createTables()
    .catch((err) => console.error('Error creating tables:', err))
    .finally(() => dbConfig_1.default.end());
