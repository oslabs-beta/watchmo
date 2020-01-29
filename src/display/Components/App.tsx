import * as React from "react";
import UserDashboard from "./UserDashboard.jsx";
import "../stylesheets/style.scss";

const App: React.FC = () => {

    return (
        <React.Fragment>{<UserDashboard />}</React.Fragment>
    )
}
// starting point 
// render(<app />, document.querySelector('#root'))

export default App;