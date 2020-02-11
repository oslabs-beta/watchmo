import * as React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, Route, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import VertColViz from './VertColViz';
//typescript: testing heading and caption
import { ProjectContext } from './Context/ProjectContext';

function UserDashboard(props) {
  //setting the state for the drop down button with typescript
  const [dropdownCatOpen, setCatOpen] = React.useState(false);

  //these are used to grab data from watchmo and loaded it into the state
  const [dataFromServer, setDataFromServer] = React.useState([]);
  const [dataGained, setDataGained] = React.useState(false);


  const { project, updateProject } = React.useContext(ProjectContext)

    if (!project.projects) {
      props.history.push("/");
    }

  //this is to hold the current category to be displayed int he bar graph
  const [currentCat, setCurrentCat] = React.useState('');

  React.useEffect(() => {
    console.log(project.projects)
    if (!dataGained) {
      console.log('whot');
      fetch(`${project.projects}/parsedData.json`)
        .then(data => data.json())
        .then(parsed => {
          setDataFromServer(parsed);
        })
        .catch(err => console.log(err));
      setDataGained(true);
    }
    else {
      console.log("i got it")
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
        <div id="configBtn">
          <Link to="/configDash">
            <button type="button" className="btnSecondary">
              CONFIG
          </button>
          </Link>
        </div>
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
