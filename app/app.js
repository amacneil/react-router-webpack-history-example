import React from "react";
import { Router, Route, IndexRoute, Link, History } from "react-router"
import createBrowserHistory from 'history/lib/createBrowserHistory'

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
      <h2>About</h2>
    );
  }
});

var App = React.createClass({
  render() {
    return (
      <div className="container">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});

React.render(
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
    </Route>
  </Router>,
  document.getElementById("app")
);
