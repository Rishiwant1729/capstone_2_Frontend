import { useEffect, useState } from "react";

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return { token, isLoading, logout };
};

export default useAuth;
