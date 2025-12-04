import { Link } from "react-router-dom";

function HomeTest() {
  return (
    <div style={{ padding: '2rem', background: '#f0f0f0', minHeight: '100vh' }}>
      <h1>Test Home Page</h1>
      <p>If you see this, React is working!</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
}

export default HomeTest;
