import postType from "../../types/post";
import { useContext, useEffect } from "react";
import { FirebaseApp } from "../../utli/firebase";
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { PostBottomIcons } from "./post-bottom-icons";
import { ACTION_TYPE } from "./feed";
import { getAuth } from "firebase/auth";

interface postBottomIconsAPIProps {
  post: postType;
  postFunctions: React.Dispatch<ACTION_TYPE>;
  toggleEditPost: () => void;
}

export function PostBottomIconsAPI({
  post,
  postFunctions,
  toggleEditPost,
}: postBottomIconsAPIProps) {
  const app = useContext(FirebaseApp);
  const auth = getAuth(app);

  useEffect(() => {
    const addPost = async () => {
      const db = getFirestore(app);
      try {
        if (post.id !== null) {
          await setDoc(
            doc(db, "forums", post.forum, "messages", post.id),
            post,
            {
              merge: true,
            }
          );
        }
      } catch (e) {
        console.error(e);
      }
    };
    addPost();
  }, [post]);

  const deletePostAPI = async () => {
    try {
      const db = getFirestore(app);
      await deleteDoc(
        doc(db, "forums", post.forum as string, "messages", post.id as string)
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PostBottomIcons
      post={post}
      uid={auth.currentUser?.uid}
      postFunctions={postFunctions}
      deleteAPI={deletePostAPI}
      toggleEditPost={toggleEditPost}
    />
  );
}
