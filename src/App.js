import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import * as actions from './store/actions';
import PizzaBuilder from './containers/PizzaBuilder/PizzaBuilder';
import firebase from 'firebase';

let config = {
  apiKey: "AIzaSyC6FLhAfzR6yolguurRC6OhOWDqUlk2itA",
  authDomain: "pizzafy-pizzabuilder.firebaseapp.com",
  databaseURL: "https://pizzafy-pizzabuilder.firebaseio.com",
  projectId: "pizzafy-pizzabuilder",
  storageBucket: "pizzafy-pizzabuilder.appspot.com",
  messagingSenderId: "273048159556"
};
firebase.initializeApp(config);

var db = firebase.firestore();


class App extends Component {
  componentWillMount() {
    this.props.initApp(db);
  }
  render() {
    return (
      <PizzaBuilder />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initApp: (database) => dispatch(actions.initApp(database))
  }
}

export default connect(null, mapDispatchToProps)(App);
