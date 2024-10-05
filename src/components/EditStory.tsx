import { FC } from "react";
import Container from "./Container";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Title from "./Title";
import TextInput from "./TextInput";

const EditStory:FC=()=>{
    const user = useSelector((state:RootState)=> state.user)

    return (
        <div>
        <Container width={60} justifyContent="center">
            <Title titleTag="h3" text="Edit story name"></Title>
            
            <Container width={20}> 
                
                {user.login ? <p>{user.username}</p> : <a>login</a>}
            </Container>
            
        </Container>
        </div>
    )

    

    
}
export default EditStory;