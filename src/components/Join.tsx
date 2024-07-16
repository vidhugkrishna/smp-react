import { FC } from "react"
import Title from "./Title"
import TextInput from "./TextInput"
import Button from "./Button"
import Spacer from "./Spacer"
import Container from "./Container"

const Join:FC = ()=>{

    return (        <div>
        <Container width={50}>
            <div className="join-modal">
                <Title titleTag={"h1"} text={"Let's Starts"} ></Title>
                <Title titleTag={"h4"} text={"Join the room"} ></Title>
                <TextInput inputLabel={""} placeholder={"Enter your name"}></TextInput>
                <Spacer height={30}></Spacer>
                <Button Button={"Enter"}></Button>
            </div>
        </Container>
        </div>
    )
}

export default Join