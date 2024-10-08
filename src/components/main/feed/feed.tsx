import Post from "../post/post";
import { useReducer } from "react";

import { PostsDispatchContext } from "./context/postReducerContext";
import { postsReducer } from "../post/reducers/postsReducer";
import type { postType } from "../post/types/post";

interface FeedType {
	initialPosts: postType[];
	showForumInfo: boolean;
}

export default function Feed({ initialPosts, showForumInfo }: FeedType) {
	const [posts, dispatch] = useReducer(postsReducer, initialPosts);

	return (
		<PostsDispatchContext.Provider value={dispatch}>
			<div className="flex flex-col justify-center gap-3 dark:text-white text-black m-3">
				{posts.length === 0 ? (
					<div className="self-center text-lg">No Messages</div>
				) : (
					posts.map((post) => {
						return (
							<div
								className="flex flex-col flex-1 dark:bg-neutral-700 bg-white self-center dark:border-none border-neutral-400 border pl-5 pr-5 pb-3 pt-3 max-w-2xl w-screen md:w-11/12 rounded-xl"
								key={`message-${post.id}`}
								id={`message-${post.id}`}
							>
								<Post showForumInfo={showForumInfo} post={post} />
							</div>
						);
					})
				)}
			</div>
		</PostsDispatchContext.Provider>
	);
}
