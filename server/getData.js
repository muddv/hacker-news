import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
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
    //TODO: check if shanpshots exist
    for (let i = 0; i < 5; i++) {
        if (!storyIds.includes(data[i])) {
            storyIds.push(data[i]);
            onValue(ref(db, `v0/item/${data[i]}`), (snapshot) => {
                updateStories(snapshot.val());
            });
        }
    }
}
export let storyData = [];
//@ts-ignore
function updateStories(stories) {
    //TODO filter this earlier
    if (stories !== null) {
        storyData.push(stories);
    }
    return storyData;
}
