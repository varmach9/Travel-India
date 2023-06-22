import { useContext } from "react";
import { LoginContext } from "./Contexts/LoginContext";

function Plan() {
    // console.log(props.user.hasOwnProperty("name"))
    const {userName}=useContext(LoginContext);
    // console.log("hhhhhhhh",userName)
    return (
        <div style={{height:"400px"}}> 
        {(userName!=="undefined")?
        <div>{userName}'s travel plans:
        </div>:
        <div>
            Login to See Your Past Plans
        </div>}
        </div>
    );
}
export default Plan;