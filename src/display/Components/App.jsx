import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import UserDashboard from './UserDashboard.jsx';
import ConfigDashboard from './ConfigDashboard.jsx';
import '../stylesheets/style.scss';

const App = () => {
  return (
    <div className="router">
      <Router>
        <Route exact path="/configDash" component={ConfigDashboard} />
        <Route exact path="/" component={UserDashboard} />
      </Router>
    </div>
  );
};
// starting point
ReactDOM.render(<App />, document.getElementById('root'));

export default App;
