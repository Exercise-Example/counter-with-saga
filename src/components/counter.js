import React from "react";

class Counter extends React.Component {
  render() {
    const { value, onIncrement, onDecrement, incrementAsync, readRibbt,data } = this.props;
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button type="button" onClick={onIncrement}>
            +
          </button>
          <p>{value}</p>
          <button type="button" onClick={onDecrement}>
            -
          </button>
          <div>
            <button type="button" onClick={incrementAsync}>
              Increment async
            </button>
          </div>
          <div>
            <button type="button" onClick={readRibbt}>
              readRibbt
            </button>
          </div>
          <div>
            { data? JSON.stringify(data.data):''}
          </div>
         
        </div>
      </div>
    );
  }
}

export default Counter;
