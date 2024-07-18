import "./App.css";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from "react-qr-code";
import openlink from "./openlink.png";
import qrcode from "./qrcode.png";

function App() {
  const [value, setValue] = useState("");
  const [shortenUrl, setshortenUrl] = useState("");
  const [copy, setCopy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [handleInput, setHandleInput] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const getTinyUrl = async (url) => {
    if (url) {
      setHandleInput(false);
      const res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`);
      const shortenURL = await res.text();
      setshortenUrl(shortenURL);
      setIsLoading(false); // stop loading once the URL is shortened
    } else {
      setHandleInput(true);
    }
  };

  const resetForm = () => {
    setValue("");
    setshortenUrl("");
    setCopy(false);
    setIsLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-slate-50 p-10 rounded-xl w-2/4">
        <h1 className="text-3xl text-center font-bold mb-10">
          Turn Long URLs into Short
        </h1>
        <label className="mb-3 inline-block font-bold">Long Url</label>
        <input
          className={`w-full border border-black p-3 rounded-md ${
            handleInput ? "border-red-600" : ""
          }`}
          placeholder="Enter Long URL"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required="true"
        />
        {handleInput && <p className="text-red-600">Please Enter URL</p>}
        <button
          className="px-10 py-3 rounded-md text-white bg-blue-400 flex mx-auto mt-5 disabled:bg-blue-300"
          disabled={isLoading}
          onClick={() => {
            if (value) {
              setIsLoading(true);
            }
            getTinyUrl(value);
          }}
        >
          {isLoading ? "Shortening..." : "Shorten URL"}
        </button>

        {shortenUrl && (
          <div className="mt-10">
            <label className="mb-3 inline-block font-bold">Shortened Url</label>
            <div className="flex justify-center">
              <p
                className={`w-full border p-3 rounded-md bg-slate-200 ${
                  copy ? "border-green-500" : ""
                }`}
              >
                {shortenUrl}
              </p>
              <CopyToClipboard text={shortenUrl} onCopy={() => setCopy(true)}>
                <button
                  className={`px-10 py-3 ml-3 border border-blue-400 rounded-md ${
                    copy ? "bg-blue-400 text-white" : "text-blue-400"
                  }`}
                >
                  {copy ? "Copied" : "Copy"}
                </button>
              </CopyToClipboard>
              <a
                href={shortenUrl}
                rel="noreferrer"
                target="_blank"
                className="py-3 px-4 rounded-md text-white bg-blue-400 flex items-center ml-3"
              >
                <img
                  src={openlink}
                  className="min-w-[28px]"
                  alt="open link in new tab"
                />
              </a>
              <div className="relative">
                <button
                  className="py-3 px-4 rounded-md text-white bg-blue-400 flex items-center ml-3"
                  onClick={() => setQrOpen(!qrOpen)}
                >
                   <img
                  src={qrcode}
                  className="min-w-[28px]"
                  alt="open link in new tab"
                />
                </button>
                <div
                  className={`absolute p-5 bg-white rounded-md right-0 shadow-md top-full mt-2 ${
                    qrOpen ? "" : "hidden"
                  }`}
                >
                  <QRCode
                    size={25}
                    style={{ height: "auto", maxWidth: "100", width: "100" }}
                    value={shortenUrl}
                    viewBox={`0 0 100 100`}
                  />
                </div>
              </div>
            </div>
            <button
              className="px-10 py-3 rounded-md text-white bg-blue-400 mt-8 w-full"
              onClick={resetForm}
            >
              Shorten Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
