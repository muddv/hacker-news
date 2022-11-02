import { initializeApp } from 'firebase/app'
import { DataSnapshot, getDatabase, onValue, ref, get } from 'firebase/database'

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
			onValue(ref(db, `v0/item/${storyIds[storyIds.length - 1]}`), (snapshot) => {
				if (snapshot.exists()) {
					//making a variable here for types to work correctly in next function
					let story: Story = snapshot.val()
					updateStoryData(story)
				}
			})
		}
	}
}

export async function getComments(commentIds: Comment["id"][]) {
	console.log("getComments")
	let comments: Comment[] = []
	await Promise.all(commentIds.map(async (commentId) => {
		console.log("PROMISE")
		let reference = ref(db, `v0/item/${commentId}`)
		let snapshot = await get(reference).then((snapshot) => {
			if (snapshot.exists()) {
				comments.push(snapshot.val())
			}
		})
	}))
	console.log(comments)
	return comments
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

interface Comment {
	by: string,
	id: number,
	kids: number[],
	parent: number,
	text: string,
	time: number,
	type: 'comment'
}

export let storyData: Story[] = []

function updateStoryData(story: Story) {
	//TODO better filter logic
	let allIds = storyData.map(item => item.id)
	if (!allIds.includes(story!.id)) {
		storyData.push(story!)
	}
	return storyData
}

export let recievedIndex: number
export function updateRecievedIndex(index: number) {
	return recievedIndex = index
}
