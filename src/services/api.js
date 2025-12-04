import { API_URL } from "../config";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Auth APIs
export const signup = async (userData) => {
  const response = await fetch(`${API_URL}api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Signup failed");
  return data;
};

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Login failed");
  return data;
};

export const getProfile = async () => {
  const response = await fetch(`${API_URL}api/auth/me`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch profile");
  return data;
};

// Book APIs
export const uploadBook = async (formData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}api/books/upload`, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData, // FormData for file upload
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Upload failed");
  return data;
};

export const getBooks = async () => {
  const response = await fetch(`${API_URL}api/books`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch books");
  return data;
};

export const getBookSummary = async (bookId) => {
  const response = await fetch(`${API_URL}api/books/${bookId}/summary`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch summary");
  return data;
};

export const deleteBook = async (bookId) => {
  const response = await fetch(`${API_URL}api/books/${bookId}/delete`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to delete book");
  }
  return true;
};

// Summary APIs
export const updateSummary = async (bookId, content, highlights) => {
  const response = await fetch(`${API_URL}api/books/${bookId}/summary`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ content, highlights }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to update summary");
  return data;
};

export const deleteSummary = async (bookId) => {
  const response = await fetch(`${API_URL}api/books/${bookId}/summary`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to delete summary");
  }
  return true;
};

export const regenerateSummary = async (bookId) => {
  const response = await fetch(`${API_URL}api/books/${bookId}/summary/regenerate`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to regenerate summary");
  return data;
};

// Note APIs
export const addNote = async (summaryId, content) => {
  const response = await fetch(`${API_URL}api/summaries/${summaryId}/notes`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ content }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to add note");
  return data;
};

export const getNotes = async (summaryId) => {
  const response = await fetch(`${API_URL}api/summaries/${summaryId}/notes`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch notes");
  return data;
};

export const updateNote = async (noteId, content) => {
  const response = await fetch(`${API_URL}api/notes/${noteId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ content }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to update note");
  return data;
};

export const deleteNote = async (noteId) => {
  const response = await fetch(`${API_URL}api/notes/${noteId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to delete note");
  }
  return true;
};
