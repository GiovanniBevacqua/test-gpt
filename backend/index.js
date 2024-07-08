const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/gpt', async (req, res) => {
  const { input } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'ft:gpt-3.5-turbo-0125:personal::9iojq55h',
      messages: [{ role: 'user', content: input }],
      max_tokens: 800,
    }, {
      headers: {
        'Authorization': 'Bearer <OPENAI_API_KEY>',
        'Content-Type': 'application/json'
      }
    });
    res.json({ choice: response.data.choices[0] });
  } catch (error) {
    console.error('Errore nella richiesta GPT:', error);
    res.status(500).send('Something went wrong');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
