import express from 'express';
import dotenv from 'dotenv';
import { getLatestStories, storyData } from './getData.js';
dotenv.config();
const app = express();
const port = process.env.PORT;
app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/news', (req, res) => {
    res.json(storyData);
});
await getLatestStories();
app.listen(port, () => {
    console.log(`[server]: Server is listening at localhost:${port}`);
});
