import { FC,ChangeEvent,MouseEvent } from "react";
import Container from "./Container";
import Button from "./Button";
import { useSelector,useDispatch } from "react-redux";
import { updateSta,signOutUser} from "../redux/userSlice"
import { RootState,AppDispatch } from "../redux/store";
import companyLogo from '../assets/logo.png';
import './nav.css';


const Nav:FC=()=>{
    const user = useSelector((state:RootState)=> state.user)
    const dispatch:AppDispatch = useDispatch();

    const signOut=(e:MouseEvent<HTMLButtonElement>)=>{
        dispatch(updateSta("LOGIN"))
        dispatch(signOutUser())
        localStorage.removeItem("loginCred");


    }

    return (
        <Container classNames="nav" width={100} color="black" justifyContent="flex-end">

                {user.login ? <p>Hi {user.username}</p> : <button className="login-button" onClick={()=>dispatch(updateSta("LOGIN"))}>login</button>}
                {user.login ? <button  onClick={() => dispatch(updateSta("joinRoom"))}>Join group</button> : ""}
                {user.login ? <button  onClick={signOut}>Sign out</button> : ""}
            
        </Container>
    )



    
}
export default Nav;