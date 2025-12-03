import { useCallback, useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import useAuth from "./useAuth";

const useFetch = (
  url,
  { method = "get", payload = null, enabled = true, requiresAuth = true } = {}
) => {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(enabled);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: response } = await axios.request({
        url,
        method,
        data: payload,
      });
      setData(response);
      setError("");
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || "Unable to load data";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [url, method, payload]);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }
    if (requiresAuth && !token) {
      setLoading(false);
      return;
    }
    fetchData();
  }, [enabled, requiresAuth, token, fetchData]);

  return { data, error, loading, refetch: fetchData };
};

export default useFetch;

