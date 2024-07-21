import { FC } from "react";
import Container from "./Container";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Nav:FC=()=>{
    const user = useSelector((state:RootState)=> state.user)

    return (
        <Container width={100} alignItems="space-between">
            <Container width={80}><img src="public/logo.png"></img></Container>
            <Container width={20}> 
                
                {user.login ? <p>{user.name}</p> : <a>login</a>}
            </Container>
            
        </Container>
    )

    

    
}
export default Nav;