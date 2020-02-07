import * as React from 'react';
import * as ReactDom from 'react-dom';
import { App } from './Components/App';
import { ProjectProvider } from './Components/Context/ProjectContext';

ReactDom.render(
  <ProjectProvider>
    <App />
  </ProjectProvider>, 
  document.getElementById('root'));

