CREATE TABLE Users (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    name           VARCHAR(255) NOT NULL,
    email          VARCHAR(255) UNIQUE NOT NULL,
    password       VARCHAR(255) NOT NULL, -- Hashed password
    nationality    VARCHAR(100), -- User's country
    level          ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Lessons (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    title         VARCHAR(255) NOT NULL,  -- Lesson topic
    content       TEXT NOT NULL,          -- AI-generated lesson text
    audio_url     VARCHAR(255),           -- Pronunciation audio (optional)
    difficulty    ENUM('beginner', 'intermediate', 'advanced'),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Vocabulary (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    lesson_id           INT NOT NULL,
    word_kinyarwanda    VARCHAR(255) NOT NULL, -- Kinyarwanda word
    word_translation    VARCHAR(255) NOT NULL, -- English translation
    audio_url          VARCHAR(255), -- Pronunciation audio
    example_sentence    TEXT, -- Example sentence
    FOREIGN KEY (lesson_id) REFERENCES Lessons(id) ON DELETE CASCADE
);
CREATE TABLE Quizzes (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    lesson_id   INT NOT NULL, -- Links quiz to a lesson
    question    TEXT NOT NULL, -- AI-generated question
    type        ENUM('multiple_choice', 'fill_blank', 'listening', 'sentence_order') NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES Lessons(id) ON DELETE CASCADE
);
CREATE TABLE Quiz_Options (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id      INT NOT NULL,
    option_text  VARCHAR(255) NOT NULL, -- Answer choice
    is_correct   BOOLEAN NOT NULL, -- 1 = Correct, 0 = Incorrect
    FOREIGN KEY (quiz_id) REFERENCES Quizzes(id) ON DELETE CASCADE
);
CREATE TABLE User_Progress (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT NOT NULL,
    lesson_id   INT NOT NULL,
    quiz_score  INT DEFAULT 0, -- Last quiz score
    completed   BOOLEAN DEFAULT FALSE, -- Has the user finished the lesson?
    last_attempt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Last time user interacted with lesson
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES Lessons(id) ON DELETE CASCADE
);
CREATE TABLE Speech_Recognition (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT NOT NULL,
    lesson_id       INT NOT NULL,
    recorded_audio  VARCHAR(255) NOT NULL, -- User's pronunciation attempt
    accuracy_score  DECIMAL(5,2), -- AI rating of pronunciation accuracy
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES Lessons(id) ON DELETE CASCADE
);
CREATE TABLE AI_Feedback (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT NOT NULL,
    lesson_id   INT NOT NULL,
    feedback    TEXT NOT NULL, -- AI-generated personalized feedback
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES Lessons(id) ON DELETE CASCADE
);
CREATE TABLE Chatbot_Conversations (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    user_id      INT NOT NULL,
    message      TEXT NOT NULL, -- User's input
    bot_response TEXT NOT NULL, -- AI-generated response
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);
🔹 Key Functionalities Covered in This Database Schema
✅ User Authentication & Registration (with nationality for personalized learning).
✅ AI-Generated Lessons (dynamic content stored in the database).
✅ Vocabulary Storage (lesson-based words with translations & audio).
✅ Quiz Generation (AI-powered multiple-choice & fill-in-the-blank).
✅ User Progress Tracking (lesson completion, quiz scores).
✅ Speech Recognition (voice-based pronunciation practice).
✅ AI Feedback & Chatbot Integration (personalized learning & AI conversations).