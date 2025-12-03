import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "../utils/axiosConfig";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [status, setStatus] = useState("idle");

  const persistSession = useCallback((payload) => {
    if (!payload?.token) {
      return;
    }
    localStorage.setItem("token", payload.token);
    setToken(payload.token);
    setUser(payload.user);
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setStatus("ready");
        return;
      }

      setStatus("loading");
      try {
        const { data } = await axios.get("/auth/me");
        setUser(data.user);
        setStatus("ready");
      } catch (error) {
        console.error("Profile bootstrap failed", error);
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setStatus("ready");
      }
    };

    bootstrap();
  }, [token]);

  const authenticate = useCallback(
    async (endpoint, credentials) => {
      const { data } = await axios.post(`/auth/${endpoint}`, credentials);
      persistSession(data);
      return data;
    },
    [persistSession]
  );

  const login = useCallback(
    (credentials) => authenticate("login", credentials),
    [authenticate]
  );

  const signup = useCallback(
    (credentials) => authenticate("signup", credentials),
    [authenticate]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading:
        status === "loading" || (token && status === "idle" && !user),
      login,
      signup,
      logout,
    }),
    [user, token, status, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };

