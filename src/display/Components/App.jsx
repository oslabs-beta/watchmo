import React, { useContext } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import UserDashboard from './UserDashboard';
import ConfigDashboard from './ConfigDashboard.jsx';
import ProjectSelect from './ProjectSelect.jsx'
import { ProjectProvider } from './Context/ProjectContext';
import '../stylesheets/style.scss';

export const App = () => {
  return (
    <div className="router">
      <Router>
        <Route exact path="/" component={ProjectSelect} />
        <Route exact path="/configDash" component={ConfigDashboard} />
        <Route exact path="/userDashBoard" component={UserDashboard} />
      </Router>
    </div>
  );
};
// // starting point
// ReactDOM.render(
//   <ProjectProvider>
//     <App />
//   </ProjectProvider>, 
//   document.getElementById('root'));


