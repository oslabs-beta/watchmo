import * as React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import VertColViz from './VertColViz';

//typescript: testing heading and caption
const UserDashboard: React.FC = () => {
  //setting the state for the drop down button with typescript
  const [dropdownCatOpen, setCatOpen] = React.useState<boolean>(false);
  const [dropdownDateOpen, setDateOpen] = React.useState<boolean>(false);

  //function that is in charge of changing the state
  const toggleCat = (): void => {
    setCatOpen(!dropdownCatOpen);
  };
  const toggleDate = (): void => {
    setDateOpen(!dropdownDateOpen);
  };
  const arrayOfCategories: string[] = ['Cat 1', 'Cat 2', 'Cat 3'];
  const categories: object[] = [];
  for (let i = 0; i < arrayOfCategories.length; i++) {
    categories.push(<DropdownItem key={i}> {arrayOfCategories[i]} </DropdownItem>);
  }
  return (
    <div id="UserDashboard">
      <h1> User Dashboard </h1>
      <button className="configButton">CONFIG</button>
      <div className="categoriesDrop">
        <ButtonDropdown isOpen={dropdownCatOpen} toggle={toggleCat}>
          <DropdownToggle caret color="primary">
            Catagories:
          </DropdownToggle>
          <DropdownMenu>{categories}</DropdownMenu>
        </ButtonDropdown>

        <ButtonDropdown isOpen={dropdownDateOpen} toggle={toggleDate}>
          <DropdownToggle caret color="info">
            Dates:
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem key={1}>Date 1</DropdownItem>
            <DropdownItem key={2}> Date 2 </DropdownItem>
            <DropdownItem key={3}> Date 3 </DropdownItem>
            <DropdownItem key={4}> Date 4 </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
      <div>
        <VertColViz />
      </div>
    </div>
  );
};

export default UserDashboard;
