Build a single-page HTHL web application for learning English vocabulary with flashcards. The app should have a Node.js backend for data persistence.
Core Features:
1. Word Management
- Users can add new words with: word, meaning, and example sentence
- Users can edit existing words (word, meaning, example)
- Users can delete words
- All words are stored in a words.json file on the server
2. Learning System with Spaced Repetition
- Each word has a score (starts at 0)
- When learning, the app picks the N words with the lowest scores (default: 5, user can change the amount)
- Higher scores = more mastered words
- Words with score >= 5 are considered "mastered"
3. Learning Session Popup
- User selects how many words to learn, then clicks "Start Learning"
- A fullscreen modal popup opens for focused learning
- Shows flashcards one at a time Click card to flip - front shows word, back shows meaning + example
- Two buttons on card back:
+ "Got It!"- increases score by 1, removes card from session 
+ "Still Learning" - decreases score by 1 (min 0), removes card fron session
- Cards disappear after marking (removed from current session)
- Shows "Session Complete" when all cards are revieved
- Options: "New Session" or "Done"
4. Navigation Tabs
- Learn - Shows stats and start learning button
- Add Word - Form to add new vocabulary
- My Words - List of all words with edit/delete buttons
5. Statistics Display
- Total words count Learning count (score < 5)
- Mastered count (score 2 5)
- Average score


Technical Requirements:

+ Frontend (index.html)
- Single HTML file with embedded CSS and JavaScript
- Dark theme with gold/amber accent colors
- Smooth 3D flip animation for cards
- Responsive design
- Keyboard shortcuts: Arrow keys to navigate, Space/Enter to flip, Escape to close modals
- Support newlines (\n) in example sentences (display as line breaks)

+ Backend (server.js)
- Node.js HTTP server (no frameworks needed)
- Serves static HTML
- REST API endpoints:
GET /api/words - Get all words
POST /api/words - Add new word (auto-generates ID and score=0)
PATCH /api/words/:id - Update word (score, word, meaning, example)
DELETE /api/words/:id - Delete word
Data stored in words.json file


Data Structure (words.json)
{
"id": 1706500001000,
"word": "Example",
"meaning": "Definition here",
"example": "Example sentence here",
"score": 0
}

UI/UX Details:
- Beautiful dark theme (#0f0f0f background
- Gold accent color (#e8c547)
- Success color for "mastered" (#4ecdc4)
- Animated background with subtle gradients
- Cards have score badge showing current score
- Toast notifications for feedbac
- Confirmation dialog before deleting words