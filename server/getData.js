import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, get } from 'firebase/database';
const config = {
    databaseURL: "https://hacker-news.firebaseio.com",
};
const app = initializeApp(config);
const db = getDatabase(app);
export async function getLatestStories() {
    //TODO: check if shanpshots exist
    let newStories = ref(db, "v0/newstories");
    onValue(newStories, (snapshot) => {
        queryStories(snapshot.val());
    });
}
let storyIds = [];
async function queryStories(data) {
    //TODO change this to 100 later
    for (let i = 0; i < 100; i++) {
        if (!storyIds.includes(data[i])) {
            storyIds.push(data[i]);
            onValue(ref(db, `v0/item/${storyIds[storyIds.length - 1]}`), (snapshot) => {
                if (snapshot.exists()) {
                    //making a variable here for types to work correctly in next function
                    let story = snapshot.val();
                    updateStoryData(story);
                }
            });
        }
    }
}
export async function getComments(commentIds) {
    let comments = [];
    await Promise.all(commentIds.map(async (commentId) => {
        let reference = ref(db, `v0/item/${commentId}`);
        let snapshot = await get(reference).then((snapshot) => {
            if (snapshot.exists()) {
                comments.push(snapshot.val());
            }
        });
    }));
    return comments;
}
export let storyData = [];
function updateStoryData(story) {
    //TODO better filter logic
    let allIds = storyData.map(item => item.id);
    if (!allIds.includes(story.id)) {
        storyData.push(story);
    }
    return storyData;
}
export let recievedIndex;
export function updateRecievedIndex(index) {
    return recievedIndex = index;
}
