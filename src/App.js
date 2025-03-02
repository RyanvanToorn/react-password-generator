import { useState, useEffect } from "react";
import "./common-styles.css"; //Common Style Sheet

export default function App() {
  return (
    <div className="app">
      <TopContent />
      <MiddleContent />
    </div>
  );
}

function TopContent() {
  return (
    <div className="top-content">
      <h3>Password Generator 🔐</h3>
    </div>
  );
}

function MiddleContent() {
  const [passwordLength, setPasswordLength] = useState(12);
  const [useUpperCase, setUseUpperCase] = useState(true);
  const [useLowerCase, setUseLowerCase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  const [generatedPassword, setGeneratedPassword] = useState("");

  // Function to generate the password whenever any option changes
  const generatePassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let allowedChars = "";

    if (useUpperCase) allowedChars += uppercaseChars;
    if (useLowerCase) allowedChars += lowercaseChars;
    if (useNumbers) allowedChars += numberChars;
    if (useSymbols) allowedChars += symbolChars;

    if (allowedChars === "") {
      alert("At least one character type must be selected.");
      return;
    }

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      password += allowedChars[randomIndex];
    }

    setGeneratedPassword(password);
  };

  // Function to copy password to clipboard
  const copyPassword = (password) => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        alert("Password copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying password: ", error);
      });
  };

  // Generate password when any option changes
  useEffect(() => {
    generatePassword();
  }, [passwordLength, useUpperCase, useLowerCase, useNumbers, useSymbols]); // Re-run when any of these change

  return (
    <div className="middle-content">
      <ResultTray
        generatedPassword={generatedPassword}
        copyPassword={() => copyPassword(generatedPassword)}
        regeneratePassword={generatePassword} // Pass down the regenerate function
      />
      <OptionsTray
        passwordLength={passwordLength}
        setPasswordLength={setPasswordLength}
        useUpperCase={useUpperCase}
        setUseUpperCase={setUseUpperCase}
        useLowerCase={useLowerCase}
        setUseLowerCase={setUseLowerCase}
        useNumbers={useNumbers}
        setUseNumbers={setUseNumbers}
        useSymbols={useSymbols}
        setUseSymbols={setUseSymbols}
      />
    </div>
  );
}

function ResultTray({ generatedPassword, copyPassword, regeneratePassword }) {
  return (
    <div className="full-width display-flex justify-content-center">
      <div className="results-tray">
        <div className="display-flex align-items-center justify-content-center">
          <div className="result-display">{generatedPassword}</div>
          <div className="buttons-container">
            <button className="copy-button" onClick={copyPassword}>
              📋
            </button>
            <button className="regenerate-button" onClick={regeneratePassword}>
              🔄
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OptionsTray({
  passwordLength,
  setPasswordLength,
  useUpperCase,
  setUseUpperCase,
  useLowerCase,
  setUseLowerCase,
  useNumbers,
  setUseNumbers,
  useSymbols,
  setUseSymbols,
}) {
  return (
    <div className="full-width display-flex justify-content-center">
      <form className="options-tray" onSubmit={(e) => e.preventDefault()}>
        <div className="password-length-container">
          <label htmlFor="passwordLength">Password Length</label>
          <input
            id="passwordLength"
            type="number"
            value={passwordLength}
            onChange={(e) => {
              const value = e.target.value.slice(0, 2); // Limit to 2 digits
              setPasswordLength(value ? Number(value) : "");
            }}
            min="1"
            max="99"
            className="password-length-input"
          />
        </div>

        <div className="charset-container">
          <div className="option-item">
            <label>Uppercase</label>
            <input
              type="checkbox"
              name="useUpperCase"
              checked={useUpperCase}
              onChange={(e) => setUseUpperCase(e.target.checked)}
            />
          </div>
          <div className="option-item">
            <label>Lowercase</label>
            <input
              type="checkbox"
              name="useLowerCase"
              checked={useLowerCase}
              onChange={(e) => setUseLowerCase(e.target.checked)}
            />
          </div>
          <div className="option-item">
            <label>Numbers</label>
            <input
              type="checkbox"
              name="useNumbers"
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
            />
          </div>
          <div className="option-item">
            <label>Symbols</label>
            <input
              type="checkbox"
              name="useSymbols"
              checked={useSymbols}
              onChange={(e) => setUseSymbols(e.target.checked)}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
