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
        <div className="equation" style={{ border: "5px solid #F1D6FF" }}>
          {equation}
        </div>
        <div className="result" style={{ border: "5px solid #ebc2ff" }}>
          {result}
        </div>
        <div className="container1">
          <button
            style={{ border: "5px solid #e4adff" }}
            className="button-number"
            id="clear"
            onClick={handleClear}
          >
            AC
          </button>
          <button
            style={{ border: "5px solid #e099ff" }}
            className="button-number"
            onClick={() => handleSigne("/")}
          >
            ÷
          </button>
          <button
            style={{ border: "5px solid #da85ff" }}
            className="button-number"
            onClick={() => handleSigne("*")}
          >
            X
          </button>
        </div>
        <div className="container2">
          <button
            style={{ border: "5px solid #d470ff" }}
            className="button-number"
            onClick={() => handleNumber("7")}
          >
            7
          </button>
          <button
            style={{ border: "5px solid #ce5cff" }}
            className="button-number"
            onClick={() => handleNumber("8")}
          >
            8
          </button>
          <button
            style={{ border: "5px solid #c847ff" }}
            className="button-number"
            onClick={() => handleNumber("9")}
          >
            9
          </button>
          <button
            style={{ border: "5px solid #c233ff" }}
            className="button-number"
            onClick={() => handleSigne("-")}
          >
            -
          </button>
        </div>
        <div className="container3">
          <button
            style={{ border: "5px solid #bc1fff" }}
            className="button-number"
            onClick={() => handleNumber("4")}
          >
            4
          </button>
          <button
            style={{ border: "5px solid #b60aff" }}
            className="button-number"
            onClick={() => handleNumber("5")}
          >
            5
          </button>
          <button
            style={{ border: "5px solid #ab00f5" }}
            className="button-number"
            onClick={() => handleNumber("6")}
          >
            6
          </button>
          <button
            style={{ border: "5px solid #9d00e0" }}
            className="button-number"
            onClick={() => handleSigne("+")}
          >
            +
          </button>
        </div>
        <div className="container4">
          <button
            style={{ border: "5px solid #8f00cc" }}
            className="button-number"
            onClick={() => handleNumber("1")}
          >
            1
          </button>
          <button
            style={{ border: "5px solid #8100b8" }}
            className="button-number"
            onClick={() => handleNumber("2")}
          >
            2
          </button>
          <button
            style={{ border: "5px solid #7200a3" }}
            className="button-number"
            onClick={() => handleNumber("3")}
          >
            3
          </button>
          <button
            style={{ border: "5px solid #64008f" }}
            className="button-number"
            onClick={() => handleEqual("=")}
          >
            =
          </button>
        </div>
        <div className="container5">
          <button
            style={{ border: "5px solid #56007a" }}
            className="button-number"
            onClick={() => handleNumber("0")}
          >
            0
          </button>
          <button
            style={{ border: "5px solid #470066" }}
            className="button-number"
            onClick={() => handlesignDot(".")}
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
