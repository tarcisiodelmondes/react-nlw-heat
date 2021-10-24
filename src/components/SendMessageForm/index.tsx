import { FormEvent, useState } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../context/auth";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

export function SendMessageForm() {
  const { user, signOut } = useAuth();

  const [message, setMessage] = useState("");

  async function handleSendMessage() {
    if (!message.trim()) return;

    await api.post("/messages", { message });

    setMessage("");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    handleSendMessage();
    toast.success("Mensagem enviada com sucesso!");
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size="32" />
      </button>

      <ToastContainer autoClose={1500} />

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>

        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" /> {user?.login}
        </span>
      </header>
      <form onSubmit={handleSubmit} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
        />
        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
}
