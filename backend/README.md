# Backend API Documentation

## Endpoints

### Questions API

#### Get Questions for a Specific Step
- **Request Type:** GET
- **URL:** `/api/questions/:step_id/questions`
  - **Example:** `http://localhost:3000/api/questions/2/questions`
- **Headers:**
  - `Authorization: Bearer <your_token>`
- **Description:** Fetch all questions for a specific step.

#### Add a Question to a Step
- **Request Type:** POST
- **URL:** `/api/questions/:step_id/questions`
  - **Example:** `http://localhost:3000/api/questions/2/questions`
- **Headers:**
  - `Authorization: Bearer <your_token>`
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
      "question_text": "What events led you to realize you were powerless over your addiction?"
  }```

### Answers API

#### Add an Answer to a Specific Question
- **Request Type:** POST
- **URL:** `/api/questions/:question_id/answers`
  - **Example:** `http://localhost:3000/api/questions/45/answers`
- **Headers:**
  - `Authorization: Bearer <your_token>`
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
      "answer_text": "This is the answer to question 45."
  }```
- **Description:** Add an answer to a specific question.

### Get Answers for a Specific Question
- **Request Type:** GET
- **URL:** `/api/questions/:question_id/answers`
  - **Example:** `http://localhost:3000/api/questions/45/answers`
- **Headers:**
  - `Authorization: Bearer <your_token>`
- **Description:** Fetch all answers for a specific question.
