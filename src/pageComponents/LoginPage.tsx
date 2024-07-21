import { FC } from "react";
import Container from "../components/Container";
import Join from "../components/Join";
import RoomSection from "./RoomSection";


const LoginPage: FC = ()=>{

    return (
        
            <Container width={100} height={100} justifyContent="center" alignItems="center">
                <RoomSection/>

            </Container>
        
    )

}

export default LoginPage