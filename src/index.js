import React, { Component } from "react";
import { render } from "react-dom";
const JediContext = React.createContext();

class JediProvider extends Component {
  state = {
    name: "Vader",
    good: false,
    counter: 1
  };
  render() {
    return (
      <JediContext.Provider
        value={{
          state: this.state,
          turnGood: () =>
            this.setState({
              good: !(this.state.good)
            }),
          addBorg: () => {
            let counter = this.state.counter + 1
            this.setState({
              counter: counter
            })
            console.log("addBorg", this.state.counter)
          }
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
          <React.Fragment>
          <div>Borg counter: {context.state.counter}</div>
          <button onClick={context.addBorg}>add borg</button>
          </React.Fragment>
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
          <p>He belonged to the {context.state.good ? 'good' : 'dark'} side</p>
          <button onClick={context.turnGood}>Turn</button>
        </React.Fragment>
      )}
    </JediContext.Consumer>
  );
};

render(<App />, document.getElementById("root"));
