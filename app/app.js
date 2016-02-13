import React from "react";
import ReactDom from "react-dom";
import _ from "underscore";

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from './redux/actions/actions.js'
import todoApp from './redux/reducers/reducers.js'


import { Router, Route, IndexRoute, Link, History } from "react-router"
import createBrowserHistory from 'history/lib/createBrowserHistory'

require('./css/style.scss')


let store = createStore(todoApp)

var Home = React.createClass({
  render() {
    return (
      <h2>Home</h2>
    )
  }
});

var About = React.createClass({
  render() {
    return (
      <div>
        <h2>About</h2>
        {this.props.children}
      </div>
    );
  }
});

var Nested = React.createClass({
  render() {
    return (
      <p>Nested content.</p>
    )
  }
});

var App = React.createClass({
  componentDidMount: function(){
    // Log the initial state
    console.log(store.getState())

    // Every time the state changes, log it
    // Note that subscribe() returns a function for unregistering the listener
    let unsubscribe = store.subscribe(() =>
      console.log(store.getState())
    )

    // Dispatch some actions
    store.dispatch(addTodo('Learn about actions'))
    store.dispatch(addTodo('Learn about reducers'))
    store.dispatch(addTodo('Learn about store'))
    store.dispatch(completeTodo(0))
    store.dispatch(completeTodo(1))
    store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

    // Stop listening to state updates
    unsubscribe();
  },
  render: function(){
    var self = this;
    return (
      <div className="container">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/about/nested">About &raquo; Nested</Link></li>
        </ul>
        {self.props.children}
      </div>
    );
  }
});

ReactDom.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="about" component={About}>
          <Route path="nested" component={Nested} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById("app")
);
