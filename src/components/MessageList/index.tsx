import styles from "./styles.module.scss";

import logoImg from "../../assets/logo.svg";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../services/api";
import { io } from "socket.io-client";

interface Messages {
  id: string;
  text: string;
  user_id: string;
  created_at: Date;
  userId: {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
    github_id: string;
    created_at: Date;
    updated_at: Date;
  };
}

const messagesQueue: Messages[] = [];

const socket = io("http://localhost:4000");

socket.on("new_message", (newMessage: Messages) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<Messages[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevState) =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );

        messagesQueue.shift();
      }
    }, 3000);
  });

  useEffect(() => {
    async function handleMessage() {
      const { data } = await api.get<Messages[]>("/messages/last3");

      setMessages(data);
    }

    handleMessage();
  }, []);

  return (
    <div className={styles.messageListBoxWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {messages.map((message, index) => {
          return (
            <li key={index} className={styles.message}>
              <p className={styles.messageContent}>{message.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img
                    src={message.userId.avatar_url}
                    alt={message.userId.name}
                  />
                </div>

                <span>{message.userId.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
