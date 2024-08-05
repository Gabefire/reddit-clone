import { useEffect, useState } from "react";
import Feed from "../feed/feed";
import type { postType } from "../feed/types/post";
import type { forumDataType } from "./types/forumData";
import { useParams } from "react-router-dom";

export default function Forum() {
	const [loading, setLoading] = useState(true);
	const [forumData, setForumData] = useState({} as forumDataType);
	const [posts, setPosts] = useState([] as postType[]);
	const param = useParams();

	useEffect(() => {
		const getForumData = async () => {
			const user = {
				displayName: "gabe",
				id: "1",
				color: "#78858B",
			};
			const leah = {
				displayName: "leah",
				id: "2",
				color: "#EFA94A",
			};
			const cece = {
				displayName: "cece",
				id: "2",
				color: "#31372B",
			};
			const forumData: forumDataType = {
				color: "#ff0000",
				description:
					"Just the day before, our host had written of the challenges of writing short. In journalism–my friend’s chosen trade, and mostly my own, too–Mark Twain’s observation undoubtedly applies: “I didn’t have time to write a short letter, so I wrote a long one instead.” The principle holds across genres, in letters, reporting, and other writing. It’s harder to be concise than to blather. (Full disclosure, this blog post will clock in at a blather-esque 803 words.) Good writing is boiled down, not baked full of air like a souffl??. No matter how yummy souffl??s may be. Which they are. Yummy like a Grisham novel.",
				following: true,
				title: param.id as string,
				owner: user,
			};
			const posts: postType[] = [
				{
					owner: user,
					content: "I like dogs",
					date: new Date(),
					title: "dogs",
					upVotes: 6,
					downVotes: 8,
					id: "1",
					forumData,
					comments: 0,
				},
				{
					owner: leah,
					content: "Yup dogs are cool",
					date: new Date(),
					title: "dogs v2",
					upVotes: 15,
					downVotes: 8,
					id: "2",
					forumData,
					comments: 500,
				},
				{
					owner: cece,
					content: "But I like cats",
					date: new Date(),
					title: "dogs v67",
					upVotes: 15000,
					downVotes: 8,
					id: "3",
					forumData,
					comments: 22222,
				},
			];

			setForumData(forumData);
			setPosts(posts);
			setLoading(false);
		};
		const getForumDataIcon = async () => {
			const user = {
				displayName: "gabe",
				id: "1",
				color: "#78858B",
			};
			const leah = {
				displayName: "leah",
				id: "2",
				color: "#EFA94A",
			};
			const cece = {
				displayName: "cece",
				id: "2",
				color: "#31372B",
			};
			const forumData: forumDataType = {
				color: "#ff0000",
				description:
					"Just the day before, our host had written of the challenges of writing short. In journalism–my friend’s chosen trade, and mostly my own, too–Mark Twain’s observation undoubtedly applies: “I didn’t have time to write a short letter, so I wrote a long one instead.” The principle holds across genres, in letters, reporting, and other writing. It’s harder to be concise than to blather. (Full disclosure, this blog post will clock in at a blather-esque 803 words.) Good writing is boiled down, not baked full of air like a souffl??. No matter how yummy souffl??s may be. Which they are. Yummy like a Grisham novel.",
				following: true,
				title: param.id as string,
				owner: user,
				icon: "cool",
			};
			const posts: postType[] = [
				{
					owner: user,
					content: "I like dogs",
					date: new Date(),
					title: "dogs",
					upVotes: 6,
					downVotes: 8,
					id: "1",
					forumData,
					comments: 0,
				},
				{
					owner: leah,
					content: "Yup dogs are cool",
					date: new Date(),
					title: "dogs v2",
					upVotes: 15,
					downVotes: 8,
					id: "2",
					forumData,
					comments: 500,
				},
				{
					owner: cece,
					content: "But I like cats",
					date: new Date(),
					title: "dogs v67",
					upVotes: 15000,
					downVotes: 8,
					id: "3",
					forumData,
					comments: 22222,
				},
			];

			setForumData(forumData);
			setPosts(posts);
			setLoading(false);
		};
		if (param.id === "test") {
			getForumData();
		} else {
			getForumDataIcon();
		}
	}, [param.id]);

	const toggleJoinForum = () => {
		// api call to join forum
		setForumData((forumData) => ({
			...forumData,
			following: !forumData.following,
		}));
	};

	const joinButtonStyle = (
		forumData: forumDataType,
	): undefined | React.CSSProperties => {
		if (!forumData.following) {
			return {
				background: "#1e3a8a",
				border: "1px solid #1e3a8a",
			};
		}
		return;
	};

	return (
		<>
			{loading ? null : (
				<div className="flex flex-col">
					<div className="bg-neutral-700 flex flex-col gap-5 pb-8 pt-8">
						<div
							className="h-1/3 min-h-44 w-full"
							style={{ backgroundColor: forumData.color }}
						/>
						<div className="flex pl-2 pr-2 *:items-center gap-2 text-white justify-between">
							<div className="flex items-center gap-2 text-white">
								{" "}
								{forumData.icon ? (
									<img
										src={forumData.icon}
										className="text-center size-14 rounded-full
								object-scale-down"
										alt={`${forumData.title} icon`}
									/>
								) : (
									<div
										className="text-center size-14 rounded-full
								text-5xl"
										style={{ backgroundColor: forumData.color }}
									>
										{forumData.title.slice(0, 1)}
									</div>
								)}
								<h1 className="text-3xl">{`r/${forumData.title}`}</h1>
							</div>
							<div className="flex gap-2">
								<button
									type="button"
									className="text-xs md:text-sm border
								rounded-2xl pt-1 pb-1 pl-2 pr-2 cursor-pointer"
								>
									Create Post
								</button>
								<button
									type="button"
									className="text-xs md:text-sm border
								rounded-2xl pt-1 pb-1 pl-2 pr-2 cursor-pointer
								w-16 min-w-16 max-w-16"
									style={joinButtonStyle(forumData)}
									onClick={toggleJoinForum}
								>
									{forumData.following ? "Joined" : "Join"}
								</button>
							</div>
						</div>
						<div className="pl-2 pr-2 text-white max-w-6xl">
							{forumData.description}
						</div>
					</div>
					<Feed initialPosts={posts} showForumInfo={false} />
				</div>
			)}
		</>
	);
}
