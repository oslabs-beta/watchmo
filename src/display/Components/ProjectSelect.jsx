import React, { useRef, useEffect, useState, useContext } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import ConfigDashboard from './ConfigDashboard';
import { ProjectContext } from './Context/ProjectContext';


function ProjectSelect(props) {

  // setting the state for the drop down button with typescript
  const [dropdownProjOpen, setProjOpen] = useState(false);

  const { project, updateProject } = useContext(ProjectContext)

  //these are used to grab data from watchmo and loaded it into the state
  const [projsFromServer, setProjsFromServer] = useState([1, 2]);
  const [projGained, setDataGained] = useState(false);

  // function that is in charge of changing the state
  const toggleCat = () => {
    setProjOpen(!dropdownProjOpen);
  };


  useEffect(() => {
    if (!projGained) {
      console.log('whot');
      fetch('/projectNames.json')
        .then(data => data.json())
        .then(parsed => {
          setProjsFromServer(parsed);
        })
        .catch(err => console.log(err));
      setDataGained(true);
    }
    else {
      console.log("i got it")
    }
  }, [projsFromServer]);


  const projcategoriesInDropDown = [];
  for (let projects of projsFromServer) {
    projcategoriesInDropDown.push(
      <DropdownItem key={projects} onClick={() => updateProject({ projects })}>
        {projects}
      </DropdownItem>
    );
  }


  return (
    <div id="projectSelect">
      <div className="projDrop">
        <ButtonDropdown isOpen={dropdownProjOpen} toggle={toggleCat}>
          <DropdownToggle caret color="primary">
            Projects:
          </DropdownToggle>
          <DropdownMenu>{projcategoriesInDropDown}</DropdownMenu>
        </ButtonDropdown>
      </div>
      {project.projects && <div>
      <div id="configBtn">
        <Link to="/configDash">
          <button type="button" className="btnSecondary">
            CONFIG
          </button>
        </Link>
      </div>
        <div>
          <Link to="/userDashBoard">
            <button type="button" className="btnSecondary">
              DASHBOARD
          </button>
          </Link>
        </div></div>}
    </div>

  );
}

export default ProjectSelect;