import './App.css';
import {useState} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';


function App() {
  const [value, setValue] = useState("")
  const [shortenUrl, setShortenUrl] = useState("")
  const [copy, setCopy] = useState(false)
  const getTinyUrl = async (url) => {
    console.log("url", url);
    const res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
    const shortenURL = await res.text()
    setShortenUrl(shortenURL)
  }
  return (
    <div className="App">
      <h1>URL Shortener With API</h1>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => {
        getTinyUrl(value)
        setShortenUrl(value); 
      }}>Shorten</button>
      {shortenUrl &&
      <div className='shortenURL'>
          <p>{shortenUrl}</p>
          <CopyToClipboard text={shortenUrl} onCopy={() => setCopy(true)}>
            <button>{copy ? 'Copied' : 'Copy'}</button>
          </CopyToClipboard>
      </div>}
    </div>
  );
}

export default App;
