import pool from './config/dbConfig';

const createTables = async () => {
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

    await pool.query(createUsersTable);
    await pool.query(createStepsTable);
    await pool.query(createTopicsTable);
    await pool.query(createCommentsTable);
    await pool.query(createJournalEntriesTable);

    console.log('Tables created successfully');
};

createTables()
    .catch((err) => console.error('Error creating tables:', err))
    .finally(() => pool.end());
