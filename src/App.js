import React, {useState} from 'react';


function App(){
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");


  const handleQuery = async () => {
    const res = await fetch ('/query_pdf',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({query}),
    });
    const data = await res.json();
    setResult(data.response);
  };

  return (
    <div>
      <h1>PDF QUERY APP</h1>
      <textarea
      placeholder='Enter your query....'
      value={query}
      onChange={(e)=> setQuery(e.target.value)}
      />
      <button onClick={handleQuery}>Query</button>
      <pre>{result}</pre>
    </div>
  )
}

export default App