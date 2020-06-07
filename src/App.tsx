/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/accessible-emoji */
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
  };

  const handleSigne = (sig: string) => {
    const lastChar = equation.slice(-1);
    const secondLastChar = equation.slice(-2, -1);
    let newEquation = equation;

    if (finish) {
      setFinish(false);
    }
    if (lastChar === "-" && sig === "-") {
      return;
    }
    if (isSigne(lastChar) && sig !== "-") {
      newEquation = equation.slice(0, -1);
      if (isSigne(secondLastChar)) {
        newEquation = equation.slice(0, -2);
      }
    }

    setResult(sig);
    setEquation(`${newEquation}${sig}`);
  };

  const handleEqual = (equal: string) => {
    let finalEquation = equation;
    const lastCharacter = equation.slice(-1);
    if (isSigne(lastCharacter)) {
      finalEquation = finalEquation.slice(0, finalEquation.length - 1);
    }
    const evalResult = eval(finalEquation);
    const finalResult = Number.isInteger(evalResult)
      ? evalResult
      : Number.parseFloat(evalResult.toFixed(4));
    setEquation(String(finalResult));
    setResult(String(finalResult));
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
      <div className="title-calculator">Calculator</div>
      <div className="container-calculator">
        <div className="equation">{equation}</div>
        <div className="result">{result}</div>
        <div className="container1">
          <a href="http://www.cinthialandia.com" target="_blank">
            <button className="button-number clear">👑</button>
          </a>
          <a
            href="https://github.com/cinthialandia/calculator-fcc"
            target="_blank"
          >
            <button className="button-number">💻</button>
          </a>
          <button className="button-number" onClick={handleClear}>
            AC
          </button>
          <button className="button-number" onClick={() => handleSigne("/")}>
            ÷
          </button>
        </div>
        <div className="container2">
          <button className="button-number" onClick={() => handleNumber("7")}>
            7
          </button>
          <button className="button-number" onClick={() => handleNumber("8")}>
            8
          </button>
          <button className="button-number" onClick={() => handleNumber("9")}>
            9
          </button>
          <button className="button-number" onClick={() => handleSigne("*")}>
            *
          </button>
        </div>
        <div className="container3">
          <button className="button-number" onClick={() => handleNumber("4")}>
            4
          </button>
          <button className="button-number" onClick={() => handleNumber("5")}>
            5
          </button>
          <button className="button-number" onClick={() => handleNumber("6")}>
            6
          </button>
          <button className="button-number" onClick={() => handleSigne("-")}>
            -
          </button>
        </div>
        <div className="container4">
          <button className="button-number" onClick={() => handleNumber("1")}>
            1
          </button>
          <button className="button-number" onClick={() => handleNumber("2")}>
            2
          </button>
          <button className="button-number" onClick={() => handleNumber("3")}>
            3
          </button>
          <button className="button-number" onClick={() => handleSigne("+")}>
            +
          </button>
        </div>
        <div className="container5">
          <button className="button-number clear">👾</button>
          <button className="button-number" onClick={() => handleNumber("0")}>
            0
          </button>
          <button className="button-number" onClick={() => handlesignDot(".")}>
            .
          </button>
          <button className="button-number" onClick={() => handleEqual("=")}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
