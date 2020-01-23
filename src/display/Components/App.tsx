import * as React from "react";
import UserDashboard from "./UserDashboard";
import "../stylesheets/style.scss";

const app: React.FC = () => {

    return (
        <React.Fragment>{< UserDashboard />}</React.Fragment>
    )
}
// starting point 
// render(<app />, document.querySelector('#root'))

export default app;