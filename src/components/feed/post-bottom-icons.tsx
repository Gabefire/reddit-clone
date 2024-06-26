/// <reference types="vite-plugin-svgr/client" />
import postType from "./post";
import React from "react";
import { ReactComponent as ArrowUp } from "../../assets/arrow-up-bold.svg";
import { ReactComponent as ArrowDown } from "../../assets/arrow-down-bold.svg";
import { ReactComponent as Comment } from "../../assets/comment.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Edit } from "../../assets/file-edit.svg";
import { POST_ACTION } from "../../reducers/postsReducer";
import { POSTS_ACTION_TYPE } from "../../reducers/postsReducerTypes";

interface postBottomIconsProps {
  post: postType;
  postFunctions: React.Dispatch<POSTS_ACTION_TYPE>;
  uid: string | null;
  deleteAPI: () => Promise<void>;
  toggleEditPost: () => void;
}

export function PostBottomIcons({
  post,
  postFunctions,
  uid,
  deleteAPI,
  toggleEditPost,
}: postBottomIconsProps) {
  const activatedUp = () => {
    if (post.upVotes.includes(uid as string) && uid !== undefined) {
      return "red";
    }
    return "white";
  };

  const activatedDown = () => {
    if (post.downVotes.includes(uid as string) && uid !== undefined) {
      return "red";
    }
    return "white";
  };

  const getVoteValue = (post: postType): number => {
    let upVoteNum: number;
    if (post.upVotes !== undefined) {
      upVoteNum = post.upVotes.length;
    } else {
      upVoteNum = 0;
    }
    let downVoteNum: number;
    if (post.downVotes !== undefined) {
      downVoteNum = post.downVotes.length;
    } else {
      downVoteNum = 0;
    }
    return upVoteNum - downVoteNum;
  };

  const upVote = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (uid !== undefined) {
      e.preventDefault();
      let id = (e.currentTarget.id as string).split("-");
      postFunctions({
        type: POST_ACTION.UP_VOTE,
        payload: { uid: uid, id: id[3] },
      });
    }
  };

  const downVote = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (uid !== undefined) {
      e.preventDefault();
      let id = (e.currentTarget.id as string).split("-");
      postFunctions({
        type: POST_ACTION.DOWN_VOTE,
        payload: { uid: uid, id: id[3] },
      });
    }
  };

  const editPost = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (uid !== undefined) {
      e.preventDefault();
      toggleEditPost();

      postFunctions({
        type: POST_ACTION.EDIT_POST,
        payload: { uid: uid, id: post.id as string },
      });
    }
  };

  const deletePost = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (uid) {
      e.preventDefault();
      postFunctions({
        type: POST_ACTION.DELETE_POST,
        payload: { uid, id: post.id as string },
      });
      deleteAPI();
    }
  };

  return (
    <div className="bottom-icons">
      <div className="likes" data-testid="likes" id={`likes-${post.id}`}>
        <button
          className="up-vote-btn icon-btn"
          aria-label="up vote"
          onClick={upVote}
          id={`up-vote-btn-${post.id}`}
        >
          <ArrowUp fill={activatedUp()} className="arrow" />
        </button>
        {getVoteValue(post)}
        <button
          className="down-vote-btn icon-btn"
          id={`down-vote-btn-${post.id}`}
          onClick={downVote}
          aria-label="down vote"
        >
          <ArrowDown fill={activatedDown()} className="arrow" />
        </button>
      </div>
      <button className="icon-btn">
        <Comment fill={"white"} className="comment-icon" />
        {0}
      </button>
      {uid === post.uid ? (
        <div className="auth-icons">
          <button className="icon-btn" onClick={deletePost}>
            <Delete fill={"white"} className="delete-icon" />
          </button>
          <button className="icon-btn" onClick={editPost}>
            <Edit fill={"white"} className="edit-icon" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
