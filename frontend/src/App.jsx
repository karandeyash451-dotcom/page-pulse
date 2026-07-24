import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeWebsite = async () => {
    try {
      setLoading(true);
      setError("");
      setReport(null);

      const response = await axios.post(
        "http://localhost:5000/api/audit",
        {
          url,
        }
      );

      setReport(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Page Pulse</h1>
        <p>Website Audit & SEO Analysis Tool</p>
      </div>

      <form
        className="search-box"
        onSubmit={(e) => {
          e.preventDefault();
          analyzeWebsite();
        }}
      >
        <input
          type="text"
          placeholder="Enter Website URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {loading && (
        <div className="loading">
          Analyzing Website...
        </div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {report && (
        <div className="report-card">
          <h2>Audit Report</h2>

          <div className="metric-grid">
            <div className="metric">
              <h3>SEO Score</h3>
              <p>{report.seoScore}/100</p>
            </div>

            <div className="metric">
              <h3>Status</h3>
              <p
                style={{
                  color:
                    report.status === 200
                      ? "#22c55e"
                      : "#ef4444",
                }}
              >
                {report.status}
              </p>
            </div>

            <div className="metric">
              <h3>Response Time</h3>
              <p>{report.responseTime} ms</p>
            </div>

            <div className="metric">
              <h3>H1 Count</h3>
              <p>{report.h1Count}</p>
            </div>

            <div className="metric">
              <h3>Missing Alt Images</h3>
              <p>{report.missingAltImages}</p>
            </div>

            <div className="metric">
              <h3>Word Count</h3>
              <p>{report.wordCount}</p>
            </div>
          </div>

          <div className="long-text">
            <strong>Page Title</strong>
            <br />
            <br />
            {report.title}
          </div>

          <div className="long-text">
            <strong>Meta Description</strong>
            <br />
            <br />
            {report.metaDescription}
          </div>
        </div>
      )}

      <div className="footer">
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noreferrer"
        >
          Built for Digital Heroes Training Task
        </a>
      </div>
    </div>
  );
}

export default App;