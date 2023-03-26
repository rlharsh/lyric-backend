require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const PORT = process.env.PORT || 3001;

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY
});

const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;

    try {

        openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages
        }).then(response => {
            res.json(response.data.choices[0].message);
            console.log(response.data.choices[0].message);
        })
    } catch (error) {
        res.status(500).json({ error: 'Error processing ChatGPT API request' });
    }

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
