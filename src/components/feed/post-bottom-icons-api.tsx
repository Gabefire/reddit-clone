import postType from "../../types/post";
import { useContext, useEffect, useMemo } from "react";
import { FirebaseApp } from "../../utli/firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { PostBottomIcons } from "./post-bottom-icons";
import { ACTION_TYPE } from "./feed-api";
import { getAuth } from "firebase/auth";

interface postBottomIconsAPIProps {
  post: postType;
  postFunctions: React.Dispatch<ACTION_TYPE>;
}

export function PostBottomIconsAPI({
  post,
  postFunctions,
}: postBottomIconsAPIProps) {
  const app = useContext(FirebaseApp);
  const auth = getAuth(app);
  const postMemo = useMemo(() => {
    return post;
  }, [post]);
  useEffect(() => {
    const addPost = async () => {
      const db = getFirestore(app);
      try {
        await setDoc(doc(db, "forums", post.forum, "messages", post.id), post, {
          merge: true,
        });
      } catch (e) {
        console.error(e);
      }
    };
    addPost();
  }, [postMemo]);

  return <PostBottomIcons post={postMemo} uid={auth.currentUser?.uid} />;
}
