import styles from "./App.module.scss";
import { Loading } from "./components/Loading";
import { LoginBox } from "./components/LoginBox";
import { MessageList } from "./components/MessageList";
import { SendMessageForm } from "./components/SendMessageForm";
import { useAuth } from "./context/auth";

export function App() {
  const { user, isLoading } = useAuth();

  return (
    <main
      className={`${styles.contentWrapper} ${
        !!user ? styles.contentSigned : ""
      } `}
    >
      {isLoading && <Loading />}

      <MessageList />

      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
}
