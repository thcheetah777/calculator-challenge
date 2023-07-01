import { useState, useEffect } from "react";

const typableRegex = /(^[+-/*()0-9]|Backspace|Enter|Escape|c)/g;

function App() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const raiseError = () => {
      setInput("NaN");
      setError(true);
    }

    const calculate = () => {
      try {
        const result = eval(input);
        if (result !== input) {
          if (result === undefined) {
            raiseError();
          } else {
            setInput(String(result));
          }
        }
      } catch {
        raiseError();
      }
    }
  
    const keyTyped = (e) => {
      if (e.key.match(typableRegex) === null) return;
  
      if (e.key === "Enter") {
        calculate();
      } else if (e.key === "Backspace") {
        setInput(prev => prev.slice(0, -1));
      } else if (e.key === "Escape" || e.key === "c") {
        setInput("");
      } else {
        if (error) {
          setError(false);
          setInput("");
        }

        setInput(prev => prev + e.key);
      }
  
      e.preventDefault();
    }

    document.addEventListener("keydown", keyTyped);

    return () => document.removeEventListener("keydown", keyTyped);
  }, [input, error]);

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="ball absolute -z-10" />
      <p className={(input ? "p-5" : "border border-white") + " text-center mx-10 flex-grow rounded-full glow outline-none text-white text-3xl overflow-hidden duration-300"}>{input}</p>
    </main>
  );
}

export default App;
