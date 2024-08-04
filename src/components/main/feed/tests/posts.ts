import type { forumDataType } from "../../forum/types/forumData";
import type { postType } from "../types/post";

export const generatePosts = () => {
	const owner1 = {
		displayName: "owner1",
		id: "1",
		color: "#EFA94A",
	};
	const owner2 = {
		displayName: "owner2",
		id: "2",
		color: "#78858B",
	};
	const forumData1: forumDataType = {
		color: "#ff0000",
		description: "Test description",
		following: true,
		title: "test1",
		owner: owner1,
	};
	const forumData2: forumDataType = {
		color: "#ff0000",
		description: "Test description",
		following: true,
		title: "test2",
		owner: owner2,
	};
	const message1: postType = {
		owner: owner2,
		content: "test",
		date: new Date(),
		title: "test",
		upVotes: 0,
		downVotes: 0,
		id: "1",
		forumData: forumData1,
	};
	const message2: postType = {
		owner: owner1,
		content: "test",
		date: new Date(),
		title: "test",
		upVotes: 0,
		downVotes: 0,
		id: "2",
		forumData: forumData2,
	};

	return [message1, message2];
};
