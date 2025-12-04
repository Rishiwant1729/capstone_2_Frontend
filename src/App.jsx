import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import BooksList from "./pages/BooksList";
import BookDetails from "./pages/BookDetails";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import ProtectedRoute from "./utils/protectedRoute";

const App = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<BooksList />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/profile" element={<Profile />} />
    </Route>

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
