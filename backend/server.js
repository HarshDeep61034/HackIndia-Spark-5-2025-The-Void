const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());
app.use(express.json());

async function simulatePineconeInsert(circularText) {
  
  console.log("🧠 [Simulate] Embedding and saving to Pinecone & NeonDB");
  return {
    pineconeId: "vec_abc123",
    metadataSaved: true
  };
}

async function simulateMistralQuery(queryText) {
  console.log("🔍 [Simulate] Searching Pinecone for related context...");
  const fakeContext = "Circular: Mid-semester exams start on 24th October.";

  console.log("🤖 [Simulate] Sending to Mistral for generation...");
  const mistralResponse = `According to the circular, your exams start on 24th October.`;

  return {
    answer: mistralResponse,
    sources: ["https://college.edu/circulars/exam-schedule"]
  };
}

app.post('/api/flowise', async (req, res) => {
  try {
    const response = await fetch(
      "https://cloud.flowiseai.com/api/v1/prediction/5aeff95e-9800-4f0b-adc1-247a04f1eb2e",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      }
    );
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📨 Upload circulars (simulate chunk, embed, store in Pinecone + Prisma)
app.post('/api/upload', async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: 'No text provided' });

  const result = await simulatePineconeInsert(text);

  res.json({
    message: "Circular uploaded successfully.",
    pineconeId: result.pineconeId,
    metadataSaved: result.metadataSaved
  });
});


app.post('/api/query', async (req, res) => {
  const { question } = req.body;

  if (!question) return res.status(400).json({ error: 'No question provided' });

  const result = await simulateMistralQuery(question);

  res.json(result);
});

let flashcards = [
  { id: 1, question: "What is DBMS?", answer: "Database Management System manages data efficiently." },
  { id: 2, question: "Define HTTP.", answer: "Hypertext Transfer Protocol is used for web communication." }
];

app.get('/api/flashcards', (req, res) => {
  res.json(flashcards);
});

app.post('/api/flashcards', (req, res) => {
  const { question, answer } = req.body;
  const id = flashcards.length + 1;
  flashcards.push({ id, question, answer });
  res.json({ message: "Flashcard added.", id });
});

app.delete('/api/flashcards/:id', (req, res) => {
  const id = parseInt(req.params.id);
  flashcards = flashcards.filter(fc => fc.id !== id);
  res.json({ message: `Flashcard with ID ${id} deleted.` });
});


app.listen(5000, () => {
  console.log("⚡ Server running on http://localhost:5000");
});
