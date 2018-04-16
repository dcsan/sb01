import React, { Component } from "react";
import { render } from "react-dom";
const JediContext = React.createContext();

class JediProvider extends Component {
  state = {
    name: "Vader",
    side: "dark",
    counter: 1
  };
  addBorg = () => {
    console.log("addBorg");
    this.counter = this.counter + 1;
  };
  render() {
    return (
      <JediContext.Provider
        value={{
          state: this.state,
          turnGood: () =>
            this.setState({
              side: "good"
            })
        }}
      >
        {this.props.children}
      </JediContext.Provider>
    );
  }
}

class App extends Component {
  render() {
    return (
      <JediProvider>
        <Borg />
        <Vader />
      </JediProvider>
    );
  }
}

const Vader = props => {
  return <Luke />;
};
const Luke = props => {
  return <KyloRen />;
};

const Borg = props => {
  return (
    <JediContext.Consumer>
      {context => (
        <div>
          <div>Borg counter: {context.state.counter}</div>
          <button onClick={context.addBorg}>add borg</button>
        </div>
      )}
    </JediContext.Consumer>
  );
};

const KyloRen = props => {
  return (
    <JediContext.Consumer>
      {context => (
        <React.Fragment>
          <p>My grandfather is {context.state.name} </p>
          <p>He belonged to the {context.state.side} side</p>
          <button onClick={context.turnGood}>Turn</button>
        </React.Fragment>
      )}
    </JediContext.Consumer>
  );
};

render(<App />, document.getElementById("root"));
