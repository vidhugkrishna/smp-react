import { FC, useEffect } from "react";
import Container from "../components/Container";
import Join from "../components/Join";
import RoomSection from "./RoomSection";
import { connectRoom,sendMessage } from "../fetch/wsApi"


const LoginPage: FC = ()=>{

//useEffect(()=>{connectRoom()},[])

    return (
        
            <Container width={100} height={100} justifyContent="center" alignItems="center">
                <RoomSection/>

            </Container>
        
    )

}

export default LoginPage