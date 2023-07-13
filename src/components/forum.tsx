import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FirebaseApp } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import "./forum.css";

export default function Forum() {
  const param = useParams().id as string;
  const app = useContext(FirebaseApp);
  const [forumExists, setForumExists] = useState(true);
  const [icon, setIcon] = useState("" as any);
  const [messages, setMessages] = useState(
    [] as { from: string; content: string; date: Date }[]
  );
  const [forumData, setForumData] = useState(
    {} as { color: string; description: string; icon: string | null }
  );

  useEffect(() => {
    const getForumData = async () => {
      const db = getFirestore(app);

      try {
        const data = await getDoc(doc(db, "forums", param));
        const dataObject = data.data();
        if (dataObject !== undefined) {
          const forumData: {
            color: string;
            description: string;
            icon: string | null;
          } = {
            color: dataObject.color,
            description: dataObject.description,
            icon: dataObject.icon,
          };
          setForumData(forumData);
        } else {
          setForumExists(false);
          return;
        }
      } catch (e) {
        console.error(e);
      }

      const tempMessages: { from: string; content: string; date: Date }[] = [];
      try {
        const messages = await getDocs(
          collection(db, "forums", param, "messages")
        );

        if (messages !== undefined) {
          messages.forEach((doc) => {
            tempMessages.push(
              doc.data() as { from: string; content: string; date: Date }
            );
          });
          tempMessages.sort((a, b) => {
            if (a.date > b.date) {
              return 1;
            } else if (a.date === b.date) {
              return 0;
            } else {
              return -1;
            }
          });
          setMessages(tempMessages);
        }
      } catch (e) {
        console.error(e);
      }
      const storage = getStorage();

      if (forumData.icon !== null) {
        getDownloadURL(ref(storage, `subforum-icons/${param}`))
          .then((url) => {
            setIcon(url);
          })
          .catch((e) => {
            console.error(e);
          });
      }
    };
    getForumData();
  }, []);

  const makeForum = () => {
    return (
      <div className="forum-content">
        <div id="forum-header">
          <div
            className="banner"
            style={{ backgroundColor: forumData.color }}
          ></div>
          <div className="title">
            {forumData.icon ? (
              <img
                src={icon}
                className="icon image"
                style={{ backgroundColor: forumData.color }}
              />
            ) : (
              <div
                className="icon default"
                style={{ backgroundColor: forumData.color }}
              >
                {param.slice(0, 1)}
              </div>
            )}
            <h1>{`r/${param}`}</h1>
          </div>
          <div className="description">
            Description:
            <div id="forum-description">{forumData.description}</div>
          </div>
        </div>
        <div id="messages">
          <div id="create-message">
            <Link to={`create-message`}>
              <div id="inner-create-message">Create Post</div>
            </Link>
          </div>
          {messages.length === 0 ? (
            <div id="no-messages">No Messages</div>
          ) : (
            messages.map((message, index) => {
              return (
                <div className="message" key={`message-${index}`}>
                  <div className="message-title">
                    <div className="from">{message.from}</div>
                    <div className="date">{message.date.toString()}</div>
                  </div>
                  <h4>{message.title}</h4>
                  <div className="message-content">{message.content}</div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {forumExists ? (
        makeForum()
      ) : (
        <div id="forum-not-made">Page Does Not Exist</div>
      )}
    </>
  );
}
