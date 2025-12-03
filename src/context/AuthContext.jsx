import { createContext } from "react";

const AuthContext = createContext({
  user: null,
  token: null,
  isLoading: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

export default AuthContext;

