const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const WORDS_FILE = path.join(__dirname, 'words.json');
const TOPICS_FILE = path.join(__dirname, 'topics.json');

function ensureWordsFile() {
  if (!fs.existsSync(WORDS_FILE)) {
    fs.writeFileSync(WORDS_FILE, '[]', 'utf8');
  }
}

function ensureTopicsFile() {
  if (!fs.existsSync(TOPICS_FILE)) {
    fs.writeFileSync(TOPICS_FILE, '[]', 'utf8');
  }
}

function readTopics() {
  ensureTopicsFile();
  const data = fs.readFileSync(TOPICS_FILE, 'utf8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeTopics(topics) {
  fs.writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2), 'utf8');
}

function addTopicsIfNew(names) {
  if (!Array.isArray(names) || names.length === 0) return;
  const topics = readTopics();
  let changed = false;
  for (const name of names) {
    const t = String(name).trim();
    if (t && !topics.includes(t)) {
      topics.push(t);
      topics.sort();
      changed = true;
    }
  }
  if (changed) writeTopics(topics);
}

function readWords() {
  ensureWordsFile();
  const data = fs.readFileSync(WORDS_FILE, 'utf8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeWords(words) {
  fs.writeFileSync(WORDS_FILE, JSON.stringify(words, null, 2), 'utf8');
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://localhost:${PORT}`);
  const pathname = url.pathname;
  const method = req.method;

  // CORS-style headers for API
  const jsonHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  // Serve index.html
  if (pathname === '/' || pathname === '/index.html') {
    const filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
    if (fs.existsSync(filePath)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fs.readFileSync(filePath, 'utf8'));
      return;
    }
  }

  // GET /api/words
  if (pathname === '/api/words' && method === 'GET') {
    const words = readWords();
    res.writeHead(200, jsonHeaders);
    res.end(JSON.stringify(words));
    return;
  }

  // POST /api/words
  if (pathname === '/api/words' && method === 'POST') {
    const body = await parseBody(req);
    const words = readWords();
    const id = Date.now();
    const topics = Array.isArray(body.topics) ? body.topics.map((t) => String(t).trim()).filter(Boolean) : [];
    addTopicsIfNew(topics);
    const newItem = {
      id,
      question: body.question || '',
      answer: body.answer || '',
      score: 0,
      topics: [...new Set(topics)],
    };
    words.push(newItem);
    writeWords(words);
    res.writeHead(201, jsonHeaders);
    res.end(JSON.stringify(newItem));
    return;
  }

  // PATCH /api/words/:id
  const patchMatch = pathname.match(/^\/api\/words\/(\d+)$/);
  if (patchMatch && method === 'PATCH') {
    const id = parseInt(patchMatch[1], 10);
    const body = await parseBody(req);
    const words = readWords();
    const index = words.findIndex((w) => w.id === id);
    if (index === -1) {
      res.writeHead(404, jsonHeaders);
      res.end(JSON.stringify({ error: 'Question not found' }));
      return;
    }
    if (body.question !== undefined) words[index].question = body.question;
    if (body.answer !== undefined) words[index].answer = body.answer;
    if (typeof body.score === 'number') words[index].score = Math.max(0, body.score);
    if (Array.isArray(body.topics)) {
      const topics = body.topics.map((t) => String(t).trim()).filter(Boolean);
      words[index].topics = [...new Set(topics)];
      addTopicsIfNew(topics);
    }
    writeWords(words);
    res.writeHead(200, jsonHeaders);
    res.end(JSON.stringify(words[index]));
    return;
  }

  // DELETE /api/words/:id
  const deleteMatch = pathname.match(/^\/api\/words\/(\d+)$/);
  if (deleteMatch && method === 'DELETE') {
    const id = parseInt(deleteMatch[1], 10);
    const words = readWords().filter((w) => w.id !== id);
    writeWords(words);
    res.writeHead(200, jsonHeaders);
    res.end(JSON.stringify({ deleted: true }));
    return;
  }

  // GET /api/topics
  if (pathname === '/api/topics' && method === 'GET') {
    const topics = readTopics();
    res.writeHead(200, jsonHeaders);
    res.end(JSON.stringify(topics));
    return;
  }

  // POST /api/topics
  if (pathname === '/api/topics' && method === 'POST') {
    const body = await parseBody(req);
    const name = String(body.name || body).trim();
    if (!name) {
      res.writeHead(400, jsonHeaders);
      res.end(JSON.stringify({ error: 'Topic name required' }));
      return;
    }
    const topics = readTopics();
    if (!topics.includes(name)) {
      topics.push(name);
      topics.sort();
      writeTopics(topics);
    }
    res.writeHead(201, jsonHeaders);
    res.end(JSON.stringify(name));
    return;
  }

  res.writeHead(404, jsonHeaders);
  res.end(JSON.stringify({ error: 'Not found' }));
});

ensureWordsFile();
ensureTopicsFile();
server.listen(PORT, () => {
  console.log(`Technical Q&A app running at http://localhost:${PORT}`);
});
