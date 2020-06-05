import React, { useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState("0");
  const [equation, setEquation] = useState("");
  const [finish, setFinish] = useState(false);

  const isSigne = (str: string) => {
    return str === "-" || str === "+" || str === "/" || str === "*";
  };

  const handleNumber = (num: string) => {
    if (finish) {
      return;
    }
    let currentResult = result === "0" || isSigne(result) ? "" : result;
    const newResult = `${currentResult}${num}`;

    setResult(`${newResult}`);
    setEquation(`${equation}${num}`);
    console.log(num);
  };

  const handleSigne = (sig: string) => {
    if (finish) {
      return;
    }
    if (isSigne(result)) {
      return;
    }

    setResult(sig);
    setEquation(`${equation}${sig}`);
    console.log(sig);
  };

  const handleEqual = (equal: string) => {
    let finalEquation = equation;
    const lastCharacter = equation.slice(-1);
    if (isSigne(lastCharacter)) {
      finalEquation = finalEquation.slice(0, finalEquation.length - 1);
    }

    setEquation(finalEquation);
    setResult(eval(finalEquation));

    setFinish(true);
  };

  const handleClear = () => {
    setResult("0");
    setEquation("");
    setFinish(false);
  };

  const handlesignDot = (dot: String) => {
    if (finish) {
      return;
    }
    if (result.includes(".")) {
      return;
    } else if (result === "0") {
      setResult(`${0}${dot}`);
      setEquation(`${0}${dot}`);
    } else {
      const newResult = `${result}${dot}`;
      setResult(newResult);
      setEquation(`${equation}${dot}`);
    }
  };

  return (
    <div className="App">
      <div>{equation}</div>
      <div>{result}</div>
      <div className="container1">
        <button onClick={handleClear}>AC</button>
        <button onClick={() => handleSigne("/")}>/</button>
        <button onClick={() => handleSigne("*")}>X</button>
      </div>
      <div className="container2">
        <button onClick={() => handleNumber("7")}>7</button>
        <button onClick={() => handleNumber("8")}>8</button>
        <button onClick={() => handleNumber("9")}>9</button>
        <button onClick={() => handleSigne("-")}>-</button>
      </div>
      <div className="container3">
        <button onClick={() => handleNumber("4")}>4</button>
        <button onClick={() => handleNumber("5")}>5</button>
        <button onClick={() => handleNumber("6")}>6</button>
        <button onClick={() => handleSigne("+")}>+</button>
      </div>
      <div className="container4">
        <button onClick={() => handleNumber("1")}>1</button>
        <button onClick={() => handleNumber("2")}>2</button>
        <button onClick={() => handleNumber("3")}>3</button>
        <button onClick={() => handleEqual("=")}>=</button>
      </div>
      <div className="container5">
        <button onClick={() => handleNumber("0")}>0</button>
        <button onClick={() => handlesignDot(".")}>.</button>
      </div>
    </div>
  );
}

export default App;
