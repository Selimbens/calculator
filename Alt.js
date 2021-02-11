const { useState } = React;

function App() {
  const [expression, setExpression] = useState("0");
  const [answer, setAnswer] = useState(expression);

  function display(symbol) {
    // setExpression(prevValue => {
    //   if(/[-]/.test(symbol) && /[+*/]/.test(prevValue[prevValue.length - 1])){
    //     setExpression(prevValue + symbol);
    // }  else if(/[+*/]/.test(symbol) && /[+*/]/.test(prevValue[prevValue.length - 1])){
    //    let newValue = prevValue.slice(0, prevValue.length - 1) + symbol;
    //    setExpression(newValue);
    // }  else {
    //   setExpression(prevValue + symbol);
    // }
    // });

    setExpression((prevValue) => {
      if (
        /[+*-/]/.test(symbol) &&
        /[+*-/]/.test(prevValue[prevValue.length - 1])
      ) {
        let newValue;
        if (/[-]/.test(symbol)) {
          newValue = prevValue.slice(0, prevValue.length) + symbol;
        } else {
          let count = 0;
          for (let i = 0; i < prevValue.length; i++) {
            if (isNaN(+prevValue[i])) {
              count++;
            } else {
              count = 0;
            }
          }
          newValue = prevValue.slice(0, prevValue.length - count) + symbol;
        }

        setExpression(newValue);
      } else {
        if (prevValue) {
          prevValue = prevValue + "";
          let valArr = prevValue.split(/[+/*-]/g);
          console.log("valArr " + JSON.stringify(valArr));
          let lastNumber = valArr[valArr.length - 1];
          if (!isNaN(lastNumber) && /[.]/.test(lastNumber) && symbol === ".") {
            console.log("symbol = empty ");
            symbol = "";
          }
        }

        setExpression(
          (prevValue + symbol).replace(/^0/g, "").replace(/\.+/g, ".")
        );
      }
    });

    setAnswer((prevValue) =>
      (prevValue + symbol).replace(/^0/g, "").replace(/\.+/g, ".")
    );
  }

  function calculate() {
    setAnswer(eval(expression));
    setExpression(eval(expression));
  }
  function allClear() {
    setExpression("");
    setAnswer(0);
  }
  function clear() {
    setExpression((prev) => {
      setAnswer(0);
      console.log(prev);
      prev = prev + "";
      return prev
        .split("")
        .slice(0, prev.length - 1)
        .join("");
    });
  }
  return (
    <div className="container box">
      {/* <div className="grid"> */}
        <div className="display">
          <div class="expression equation">{expression}</div>
          <div id="display" className="answer">{answer}</div>
        </div>
        <div onClick={allClear} className="padButton clear red" id="clear">AC</div>
        <div onClick={() => display("/")} className="padButton op divide" id="divide">/</div>
        <div onClick={() => display("*")} className="padButton op multiply" id="multiply" >*</div>
        <div onClick={() => display("7")} className="padButton num seven" id="seven">7</div>
        <div onClick={() => display("8")} className="padButton num eight" id="eight">8</div>
        <div onClick={() => display("9")} className="padButton num nine" id="nine">9</div>
        <div onClick={() => display("-")} className="padButton op subtract" id="subtract">-</div>
        <div onClick={() => display("4")} className="padButton num four" id="four">4</div>
        <div onClick={() => display("5")} className="padButton num five" id="five">5</div>
        <div onClick={() => display("6")} className="padButton num six" id="six">6</div>
        <div onClick={() => display("+")} className="padButton op add" id="add">+</div>
        <div onClick={() => display("1")} className="padButton num one" id="one">1</div>
        <div onClick={() => display("2")} className="padButton num two" id="two">2</div>
        <div onClick={() => display("3")} className="padButton num three" id="three">3</div>
        <div onClick={calculate} className="padButton equals" id="equals">=</div>
        <div onClick={() => display("0")} className="padButton num zero" id="zero">0</div>
        <div onClick={() => display(".")} className="padButton num decimal" id="decimal">.</div>
      {/* </div> */}
    </div>
  );
}


ReactDOM.render(<App />, document.getElementById("app"));
