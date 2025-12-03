import { Link } from "react-router-dom";
import illustration from "../assets/illustrations/upload.svg";
import SummaryCard from "../components/SummaryCard";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const { data: summaries = [] } = useFetch("/summaries");

  return (
    <section className="page">
      <div className="hero">
        <div>
          <p className="card__badge">New</p>
          <h1>Summaries crafted from the books you already love.</h1>
          <p>
            Upload PDF manuscripts, research papers, or e-books and receive
            concise, shareable insights in seconds.
          </p>
          <Link to="/upload" className="hero__cta">
            Start uploading
          </Link>
        </div>
        <img src={illustration} alt="Illustration of file upload" />
      </div>

      {summaries.length > 0 && (
        <>
          <h2>Latest summaries</h2>
          <div className="card-grid">
            {summaries.slice(0, 3).map((summary) => (
              <SummaryCard key={summary.id} summary={summary} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Home;

