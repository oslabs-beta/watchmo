import * as React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import VertColViz from './VertColViz';
//typescript: testing heading and caption
function UserDashboard() {
  //setting the state for the drop down button with typescript
  const [dropdownCatOpen, setCatOpen] = React.useState(false);
  const [dropdownDateOpen, setDateOpen] = React.useState(false);

  const [dataFromServer, setDataFromServer] = React.useState([1]);
  const [dataGained, setDataGained] = React.useState(false);

  const [currentCat, setCurrentCat] = React.useState('');

  React.useEffect(() => {
    if (!dataGained) {
      console.log('whot');
      fetch('/data')
        .then(data => data.json())
        .then(parsed => {
          setDataFromServer(parsed);
          setDataGained(true);
        })
        .catch(err => console.log(err));
    } else {
      console.log('i got the data');
      console.log(dataFromServer);
    }
  });

  //function that is in charge of changing the state
  const toggleCat = () => {
    setCatOpen(!dropdownCatOpen);
  };
  const toggleDate = () => {
    setDateOpen(!dropdownDateOpen);
  };
  const arrayOfCategories = [];
  for (let i in dataFromServer) {
    arrayOfCategories.push(i);
  }
  const categories = [];
  for (let i = 0; i < arrayOfCategories.length; i++) {
    categories.push(
      <DropdownItem key={i} onClick={() => setCurrentCat(arrayOfCategories[i])}>
        {' '}
        {arrayOfCategories[i]}{' '}
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
      {/* <button type="button" className="configButton">
        CONFIG
      </button> */}
      <h1> User Dashboard </h1>
      <div className="categoriesDrop">
        <ButtonDropdown isOpen={dropdownCatOpen} toggle={toggleCat}>
          <DropdownToggle caret color="primary">
            Categories:
          </DropdownToggle>
          <DropdownMenu>{categories}</DropdownMenu>
        </ButtonDropdown>
      </div>
      <div>
        <VertColViz dataCat={dataFromServer[currentCat]} />
      </div>
    </div>
  );
}

export default UserDashboard;
