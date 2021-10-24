import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

type AuthProvider = {
  children: ReactNode;
};

type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
  };
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${
    import.meta.env.VITE_GITHUB_CLIENT_ID
  }`;

  async function signIn(githubCode: string) {
    const { data } = await api.post<AuthResponse>("/authenticate", {
      code: githubCode,
    });

    const { token, user } = data;

    setUser(user);

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    localStorage.setItem("@dowhile:token", token);
  }

  useEffect(() => {
    const token = localStorage.getItem("@dowhile:token");

    if (!token) return;

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    api.get<User>("/profile").then((res) => setUser(res.data));
  }, []);

  function signOut() {
    setUser(null);

    localStorage.removeItem("@dowhile:token");
  }

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");

      window.history.pushState({}, "", urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
