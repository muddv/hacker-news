import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { getLatestStories, storyData, recievedIndex, updateRecievedIndex, getComments } from './getData.js';
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT;
app.get('/favico.ico', (req, res) => {
    res.sendStatus(204).end();
});
app.get('/news', (req, res) => {
    res.json(storyData);
    updateRecievedIndex(storyData.length);
});
//TODO make client submit it's own unique index, 
//otherwise this code would only work for one client at a time
app.get('/update-news', (req, res) => {
    res.json(storyData.slice(recievedIndex));
    updateRecievedIndex(storyData.length);
});
app.route('/comments')
    .post(async (req, res) => {
    let commentIds = req.body.commentIds
        .split(',')
        .map((i) => Number(i));
    try {
        let comments = await (getComments(commentIds))
            .then((comments) => res.json(comments));
    }
    catch (err) {
        res.send(err);
    }
});
await getLatestStories();
app.listen(port, () => {
    console.log(`[server]: Server is listening at http://localhost:${port}`);
});
