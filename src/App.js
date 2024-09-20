import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5000/upload_pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setUploadMessage(data.message);
      } else {
        setUploadMessage(data.error);
      }
    } catch (err) {
      setUploadMessage('Error uploading file.');
    }
  };

  const handleQuery = async () => {
    setLoading(true);
    setError('');
    setResult('');

    try {
      const res = await fetch('http://localhost:5000/query_pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setResult(data.response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>PDF Query App</h1>

      {/* Upload PDF Section */}
      <div>
        <h2>Upload PDF</h2>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleFileUpload}>Upload PDF</button>
        {uploadMessage && <p>{uploadMessage}</p>}
      </div>

      {/* Query Section */}
      <div>
        <h2>Query PDF Content</h2>
        <textarea
          placeholder="Enter your query...."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleQuery} disabled={loading}>
          {loading ? 'Querying...' : 'Query'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {result && (
          <div>
            <h3>Result:</h3>
            <pre>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
