import { ChangeEvent, FC, useState } from "react"
import Title from "./Title"
import TextInput from "./TextInput"
import Button from "./Button"
import Spacer from "./Spacer"
import Container from "./Container"

import { useDispatch,useSelector } from "react-redux"
import { RootState,AppDispatch } from "../redux/store"
import { addUser ,updteVal} from "../redux/userSlice"

const Join:FC = ()=>{
    const user = useSelector((state:RootState)=> state.user)
    const reduxTextVal = useSelector((state:RootState)=> state.value)
    const dispatch:AppDispatch = useDispatch();

    const [value, setValue] = useState<string>("");

    const handleInputUpdate=(e: ChangeEvent<HTMLSelectElement>)=>{
        setValue(e.target.value)
    }

    const handleButtonClick=(e: ChangeEvent<HTMLSelectElement>)=>{
        setValue("Clicked")
        
        dispatch(updteVal(value))
    }



    return (       
        <Container  padding={50} justifyContent="center" alignItems="center">
            <div className="join-modal">
                <p>redux test done</p>
                <Title titleTag={"h1"} text={value} ></Title>
                <Title titleTag={"h4"} text={reduxTextVal} ></Title>
                <TextInput updateFunc={handleInputUpdate} inputLabel={""} placeholder={"Enter your name"} value={value} ></TextInput>
                <Spacer height={30}></Spacer>
                <Button onClick={handleButtonClick} label={"Enter"}></Button>
            </div>
        </Container>
    )
}

export default Join