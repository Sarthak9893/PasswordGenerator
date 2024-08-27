import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [allowNumber, setAllowNumber] = useState(false);
  const [allowChar, setAllowChar] = useState(false);
  const [password, setPassword] = useState("");

  // Generate Password
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVXYWZabcdefghijklmnopqrstuvywxz";

    if (allowNumber) str += "1234567890";
    if (allowChar) str += "~!@#$%&*(){}^[]|/?-";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, allowChar, allowNumber, setPassword]);

  // take Reference
  const passwordRef = useRef(null);

  // CopyPassword from Input field
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  /* 
  useEffect Hook : Fun. call on Loading time & Dependencies change
  */
  useEffect(() => {
    passwordGenerator();
  }, [length, allowChar, allowNumber, passwordGenerator]); // Dependencies

  return (
    <>
      <div className="rounded-full p-5 mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-white">
          Password Generator
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="bg-slate-200 rounded-full p-4 w-full"
            placeholder="Generated Password"
            value={password}
            ref={passwordRef}
            readOnly
            aria-label="Generated Password"
          />
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 font-bold bg-blue-500 rounded-full p-3 text-white"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className="mt-6 flex flex-col items-center">
          <div className="flex items-center mb-4">
            <label className="text-white p-2 font-medium me-4">
              Length : {length}
            </label>
            <input
              type="range"
              min="8"
              max="20"
              step="1"
              value={length}
              className="w-64"
              aria-label="Password Length"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2"
              defaultChecked={allowNumber}
              aria-label="Include Numbers"
              onClick={() => {
                setAllowNumber((prev) => !prev);
              }}
            />
            <label className="text-white p-2 font-medium">
              Include Numbers
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              defaultChecked={allowChar}
              aria-label="Include Special Characters"
              onClick={() => {
                setAllowChar((prev) => !prev);
              }}
            />
            <label className="text-white p-2 font-medium">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
