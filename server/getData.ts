
import { initializeApp } from 'firebase/app'
import { DataSnapshot, getDatabase, onValue, ref, get } from 'firebase/database'

const config = {
	databaseURL: "https://hacker-news.firebaseio.com",
}
const app = initializeApp(config)
const db = getDatabase(app)

export async function getLatestStories() {
	let newStories = ref(db, "v0/newstories")
	onValue(newStories, (snapshot) => {
		queryStories(snapshot.val())
	})
}

let storyIds: DataSnapshot[] = []

async function queryStories(data: DataSnapshot[]) {
	for (let i = 0; i < 100; i++) {
		if (!storyIds.includes(data[i])) {
			storyIds.push(data[i])
			onValue(ref(db, `v0/item/${storyIds[storyIds.length - 1]}`), (snapshot) => {
				if (snapshot.exists()) {
					let story: Story = snapshot.val()
					updateStoryData(story)
				}
			})
		}
	}
}

export async function getComments(commentIds: Comment["id"][]) {
	let comments: Comment[] = []
	await Promise.all(commentIds.map(async (commentId) => {
		let reference = ref(db, `v0/item/${commentId}`)
		let snapshot = await get(reference).then(async (snapshot) => {
			if (snapshot.exists()) {
				let comment = snapshot.val()
				if (!storyData.map(story => story.id).includes(comment.parent)
					&& comment.kids) {
					comment.replies = await getComments(comment.kids)
				}
				comments.push(comment)
			}
		})
	}))
	return comments
}

//TODO move types to more sensible place
interface Story {
	by: string,
	descendants: number,
	id: number,
	kids: number[],
	score: number,
	titile: string,
	time: number,
	type: 'story',
	url: string,
	dead?: boolean
}

interface Comment {
	by: string,
	id: number,
	kids: number[],
	parent: number,
	text: string,
	time: number,
	type: 'comment'
	replies?: Comment[]
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

