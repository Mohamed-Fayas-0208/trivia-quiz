## Modular Trivia Quiz (Next.js 14)

This is a modular trivia quiz application built with **Next.js 14 App Router** and **JavaScript**.
It consumes the **Open Trivia Database** API for categories and multiple-choice questions.

### Features

- **Home page** with:
  - Category selector (fetched from `https://opentdb.com/api_category.php`)
  - Input for number of questions
  - Button to start the quiz and navigate to `/quiz?category=ID&amount=NUMBER`
- **Quiz page** with:
  - Fetching questions from `https://opentdb.com/api.php`
  - One question displayed at a time
  - 4 shuffled answer options
  - 20-second countdown timer per question
  - Automatic navigation to the next question when the timer reaches zero
  - Score tracking and final result screen

### Project Structure

- `app/`
  - `layout.js` – Root layout
  - `page.js` – Home page
  - `quiz/page.js` – Quiz page
  - `api/trivia/route.js` – Optional proxy route for fetching questions
- `components/`
  - `LayoutWrapper.js`
  - `CategorySelector.js`
  - `QuestionCard.js`
  - `Timer.js`
  - `ResultScreen.js`
- `lib/`
  - `fetchCategories.js`
  - `fetchQuestions.js`
  - `shuffleArray.js`
  - `decodeHtml.js`

### Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000` in your browser to use the app.

