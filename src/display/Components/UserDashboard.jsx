import React, { useContext, useEffect, useState } from 'react';

import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import VertColViz from './VertColViztsx';
import { ProjectContext } from './Context/ProjectContext';

function UserDashboard(props) {
  const [dropdownCatOpen, setCatOpen] = useState(false);

  //these are used to grab data from watchmo and loaded it into the state
  const [dataFromServer, setDataFromServer] = useState([]);
  const [dataGained, setDataGained] = useState(false);

  const { project, updateProject } = useContext(ProjectContext);

  if (!project.projects) {
    props.history.push('/');
  }

  //this is to hold the current category to be displayed int he bar graph
  const [currentCat, setCurrentCat] = useState('');

  useEffect(() => {
    if (!dataGained) {
      fetch(`${project.projects}/parsedData.json`)
        .then(data => data.json())
        .then(parsed => {
          setDataFromServer(parsed);
        })
        .catch(err => console.log(err));
      setDataGained(true);
    }
  }, [project]);

  //function that is in charge of changing the state
  const toggleCat = () => {
    setCatOpen(!dropdownCatOpen);
  };
  //dropdown menu items construction with categories from the data (the first layer of keys in the object)
  const categoriesInDropDown = [];
  for (const category in dataFromServer) {
    categoriesInDropDown.push(
      <DropdownItem key={category} onClick={() => setCurrentCat(category)}>
        {category}
      </DropdownItem>
    );
  }

  return (
    <div id="UserDashboard">
      <span id="navBtnSpan">
        <Link id="navProjLink" to="/">
          <Button color="secondary" id="navProjSelect" block>
            Project Select
          </Button>
        </Link>
        <Link id="navConfigLink" to="/configDash">
          <Button id="navConfigDash" color="secondary" block>
            Config Dashboard
          </Button>
        </Link>
      </span>

      <h1> User Dashboard </h1>
      <div className="categoriesDrop">
        <ButtonDropdown isOpen={dropdownCatOpen} toggle={toggleCat}>
          <DropdownToggle caret color="primary">
            Categories:
          </DropdownToggle>
          <DropdownMenu>{categoriesInDropDown}</DropdownMenu>
        </ButtonDropdown>
      </div>
      <div id="chartArea">
        <VertColViz dataCat={dataFromServer[currentCat]} />
      </div>
    </div>
  );
}

export default UserDashboard;
