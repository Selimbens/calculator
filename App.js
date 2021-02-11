const { useState } = React;

let currentVal = "0";
function App() {
  const [count, setCount] = useState(() => "0");
  const [result, setResult] = useState(() => "0");
  const addKey = (e) => {
    let key = e.target.innerHTML
    //if there's equal sign
    if ( count.includes('=') ) {
      //if input is number, then replace by input & replace result by zero
      if (/\d/.test(key)) {
        setCount(key)
        setResult("0")
        currentVal = key
      //if input is operator, replace by result then add operator
      } else if (/[/*-+]/.test(key)) {
        currentVal = result
        setCount(result + key)
      }
    //if there isn't an equal sign
    } else {
      //if there's a zero, replace by number or by minus
      if (count == 0 ) {
        console.log("// DEBUG: 1")
        setCount(key)
        currentVal = key
      //if there's no zero
      } else {
        //extract last input (last caract in count)
        let lastInput = count[count.length - 1]
        console.log(lastInput)

        //if last input is number, then add anything;
          if (/\d/.test(lastInput)) {
            if ( /[/*+-]/.test(key) ) { currentVal = "0" }
            setCount(count + key)
          }
        //if last input is operator, then only add numbers or minus
          //check if last input is operator
          if ( /[/*-+]/.test(lastInput) ) {
            console.log("// DEBUG: 3")

            //check if new input is number or minus sign
            if ( ( /\d/.test(key) ) || ( /[-]/.test(key) ) ) {
              console.log("// DEBUG: 2")
              setCount(count + key)
              ( /\d/.test(key) ) ? currentVal += key : currentVal = "0" ;
            } else if ( /[/*+]/.test(key) ) {
              setCount( count.slice( 0 , -1 ) + key )
            }
          }
      }
    }
  }

  const addDecim = (e) => {
    if (currentVal.indexOf('.') == -1 ) {
      setCount(count + e.target.innerHTML)
      currentVal += e.target.innerHTML;
    }
  }
  const allClear = () => {
    setCount("0")
    setResult("0")
    currentVal = "0"
  }
  const evaluate = (str) => {
    return eval(str)
  }
  const calculate = () => {
    count.includes('=') ? null : setCount(count + '=') ;
    setResult(evaluate(count))
  }
  const NumBtn = (props) => (
    <button className="num" id={props.id} onClick={addKey}>
      {props.k}
    </button>
  )
  return (
    <div className="box">
      <div className="display">
        <div className="equation">{count}</div>
        <div id="display" className="answer"> {result} </div>
      </div>
      <button className="equals" id="equals" onClick={calculate}>=</button>
      <NumBtn id="zero" k="0" />
      <NumBtn id="one" k="1" />
      <NumBtn id="two" k="2" />
      <NumBtn id="three" k="3" />
      <NumBtn id="four" k="4" />
      <NumBtn id="five" k="5" />
      <NumBtn id="six" k="6" />
      <NumBtn id="seven" k="7" />
      <NumBtn id="eight" k="8" />
      <NumBtn id="nine" k="9" />
      <button className="op" id="add" onClick={addKey}>+</button>
      <button className="op" id="subtract" onClick={addKey}>-</button>
      <button className="op" id="multiply" onClick={addKey}>*</button>
      <button className="op" id="divide" onClick={addKey}>/</button>
      <button className="num" id="decimal" onClick={addDecim}>.</button>
      <button className="clear" id="clear" onClick={allClear}>AC</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
