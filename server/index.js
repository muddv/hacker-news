import express from 'express';
import dotenv from 'dotenv';
import { getLatestStories, storyData, recievedIndex, updateRecievedIndex } from './getData.js';
dotenv.config();
const app = express();
const port = process.env.PORT;
app.get('/news', (req, res) => {
    res.json(storyData);
    console.log("recievedIndex" + recievedIndex);
    updateRecievedIndex(storyData.length);
});
//TODO make client submit it's own unique index, 
//otherwise this code would only work for one client at a time
app.get('/update-news', (req, res) => {
    res.json(storyData.slice(recievedIndex));
    console.log("recievedIndex" + recievedIndex);
    updateRecievedIndex(storyData.length);
});
await getLatestStories();
app.listen(port, () => {
    console.log(`[server]: Server is listening at http://localhost:${port}`);
});
