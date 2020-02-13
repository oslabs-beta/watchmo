/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState, useContext } from 'react';
import {
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { ProjectContext } from './Context/ProjectContext';

function ProjectSelect() {
  // setting the state for the drop down button with typescript
  const [dropdownProjOpen, setProjOpen] = useState(false);

  const { project, updateProject } = useContext(ProjectContext);

  // these are used to grab data from watchmo and loaded it into the state
  const [projsFromServer, setProjsFromServer] = useState([1, 2]);
  const [projGained, setDataGained] = useState(false);

  // function that is in charge of changing the state
  const toggleCat = () => {
    setProjOpen(!dropdownProjOpen);
  };

  useEffect(() => {
    if (!projGained) {
      fetch('/projectNames.json')
        .then(data => data.json())
        .then(parsed => {
          setProjsFromServer(parsed);
        });
      setDataGained(true);
    }
  }, [projsFromServer]);

  const projcategoriesInDropDown = [];
  for (const projects of projsFromServer) {
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
      {project.projects && (
        <div>
          <div id="userDashBtn">
            <Link to="/userDashBoard">
              <Button size="md" type="button" className="btnSecondary">
                DASHBOARD
              </Button>
            </Link>
          </div>

          <div id="configBtn">
            <Link to="/configDash">
              <Button type="button" className="btnSecondary">
                CONFIG
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectSelect;
