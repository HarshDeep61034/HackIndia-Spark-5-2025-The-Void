// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import {config} from "dotenv";
config();

const app = express();

app.use(cors()); // allow frontend to access your proxy

app.post('/api/predict', async (req, res) => {
  const response = await fetch('https://cloud.flowiseai.com/api/v1/prediction/5aeff95e-9800-4f0b-adc1-247a04f1eb2e', {
    headers: {
      'Authorization': process.env.FLOWISE_API_KEY, // if needed
    }
  });
  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log('Proxy running on http://localhost:3000'));
