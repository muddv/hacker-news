import { initializeApp } from 'firebase/app'
import { DataSnapshot, getDatabase, onValue, ref } from 'firebase/database'

const config = {
	databaseURL: "https://hacker-news.firebaseio.com",
}
const app = initializeApp(config)
const db = getDatabase(app)

export async function getLatestStories() {
	//TODO: check if shanpshots exist
	let newStories = ref(db, "v0/newstories")
	onValue(newStories, (snapshot) => {
		queryStories(snapshot.val())
	})
}

let storyIds: DataSnapshot[] = []

async function queryStories(data: DataSnapshot[]) {
	//TODO change this to 100 later
	//TODO: check if shanpshots exist
	for (let i = 0; i < 5; i++) {
		if (!storyIds.includes(data[i])) {
			storyIds.push(data[i])
			onValue(ref(db, `v0/item/${data[i]}`), (snapshot) => {
				updateStories(snapshot.val())
			})
		}
	}
}

//TODO put types in another place
interface Story {
	by: string,
	descendants: number,
	id: number,
	kids: number[],
	score: number,
	titile: string,
	time: number,
	type: 'story',
	url: string
}

export let storyData: Story[] = []

//@ts-ignore
function updateStories(stories) {
	//TODO filter this earlier
	if (stories !== null) {
		storyData.push(stories)
	}
	return storyData
}
