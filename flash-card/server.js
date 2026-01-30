const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const WORDS_FILE = path.join(__dirname, 'words.json');

// Initialize words.json if it doesn't exist
if (!fs.existsSync(WORDS_FILE)) {
    fs.writeFileSync(WORDS_FILE, JSON.stringify([], null, 2));
}

// Helper function to read words
function readWords() {
    try {
        const data = fs.readFileSync(WORDS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Helper function to write words
function writeWords(words) {
    fs.writeFileSync(WORDS_FILE, JSON.stringify(words, null, 2));
}

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Serve index.html
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
        return;
    }

    // GET /api/words - Get all words
    if (req.url === '/api/words' && req.method === 'GET') {
        const words = readWords();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(words));
        return;
    }

    // POST /api/words - Add new word
    if (req.url === '/api/words' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const newWord = JSON.parse(body);
                const words = readWords();
                
                // Auto-generate ID and set score to 0
                const word = {
                    id: Date.now(),
                    word: newWord.word,
                    meaning: newWord.meaning,
                    example: newWord.example,
                    score: 0
                };
                
                words.push(word);
                writeWords(words);
                
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(word));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid request body' }));
            }
        });
        return;
    }

    // PATCH /api/words/:id - Update word
    if (req.url.startsWith('/api/words/') && req.method === 'PATCH') {
        const id = parseInt(req.url.split('/')[3]);
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const updates = JSON.parse(body);
                const words = readWords();
                const index = words.findIndex(w => w.id === id);
                
                if (index === -1) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Word not found' }));
                    return;
                }
                
                // Update word fields
                if (updates.word !== undefined) words[index].word = updates.word;
                if (updates.meaning !== undefined) words[index].meaning = updates.meaning;
                if (updates.example !== undefined) words[index].example = updates.example;
                if (updates.score !== undefined) words[index].score = Math.max(0, updates.score);
                
                writeWords(words);
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(words[index]));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid request body' }));
            }
        });
        return;
    }

    // DELETE /api/words/:id - Delete word
    if (req.url.startsWith('/api/words/') && req.method === 'DELETE') {
        const id = parseInt(req.url.split('/')[3]);
        const words = readWords();
        const filteredWords = words.filter(w => w.id !== id);
        
        if (words.length === filteredWords.length) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Word not found' }));
            return;
        }
        
        writeWords(filteredWords);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
        return;
    }

    // 404 for other routes
    res.writeHead(404);
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`🚀 Vocabulary Flashcard Server running at http://localhost:${PORT}`);
    console.log(`📚 Words stored in: ${WORDS_FILE}`);
});
