import * as React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import VertColViz from './VertColViz';
//typescript: testing heading and caption
function UserDashboard() {

  //setting the state for the drop down button with typescript
  const [dropdownCatOpen, setCatOpen] = React.useState(false);
  const [dropdownDateOpen, setDateOpen] = React.useState(false);

  const [dataFromServer, setDataFromServer] = React.useState([1]);
  const [dataGained, setDataGained] = React.useState(false);
  
  React.useEffect(() => {
    if(!dataGained){
      console.log("whot");
      fetch('/data')
        .then(data => data.json())
        .then(parsed => {
          console.log("parsed", parsed)
          setDataFromServer(parsed)
          setDataGained(true)
        })
        .catch(err => console.log(err));
    }
    else {
      console.log("i got this")
    }
  }) 

  //function that is in charge of changing the state
  const toggleCat = () => {
    setCatOpen(!dropdownCatOpen);
  }
  const toggleDate = () => {
    setDateOpen(!dropdownDateOpen);
  }
  const arrayOfCategories = [];
  for (let i in dataFromServer) {
    arrayOfCategories.push(i);
  }
  const categories = [];
  for (let i = 0; i < arrayOfCategories.length; i++) {
    categories.push(<DropdownItem key={i} > {arrayOfCategories[i]} </DropdownItem>)
  }


  return (
    <div id='UserDashboard'>
      <h1> User Dashboard  </h1>
      <button className="configButton">CONFIG</button>
      <div className="categoriesDrop">
        <ButtonDropdown isOpen={dropdownCatOpen} toggle={toggleCat}>
          <DropdownToggle caret color="primary">
            Categories:
  </DropdownToggle>
          <DropdownMenu>
            {categories}
          </DropdownMenu>
        </ButtonDropdown>

        <ButtonDropdown isOpen={dropdownDateOpen} toggle={toggleDate}>
          <DropdownToggle caret color="info">
            Dates:
  </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Date 1</DropdownItem>
            <DropdownItem> Date 2 </DropdownItem>
            <DropdownItem> Date 3 </DropdownItem>
            <DropdownItem> Date 4 </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown></div>
      <div>
        <VertColViz datas = {dataFromServer}/>
      </div>
    </div>
  )
}

export default UserDashboard;