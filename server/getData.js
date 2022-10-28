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
            onValue(ref(db, `v0/item/${storyIds[storyIds.length - 1]}`), (snapshot) => {
                if (snapshot.exists()) {
                    //making a variable here for types to work correctly in next function
                    let updateData = snapshot.val();
                    updateStories(updateData);
                }
            });
        }
    }
}
export let storyData = [];
//@ts-ignore
function updateStories(stories) {
    console.log(stories.id);
    let allIds = storyData.map(item => item.id);
    if (!allIds.includes(stories.id)) {
        storyData.push(stories);
    }
    return storyData;
}
