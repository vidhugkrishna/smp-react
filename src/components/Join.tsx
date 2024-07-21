import { ChangeEvent, FC, useState } from "react"
import Title from "./Title"
import TextInput from "./TextInput"
import Button from "./Button"
import Spacer from "./Spacer"
import Container from "./Container"

import { useDispatch,useSelector } from "react-redux"
import { RootState,AppDispatch } from "../redux/store"
import { addUser ,updateSta} from "../redux/userSlice"
import { postUserApi } from "../fetch/userApi"

const Join:FC = ()=>{
    const user = useSelector((state:RootState)=> state.user)
    const appState = useSelector((state:RootState)=> state.appState)
    const dispatch:AppDispatch = useDispatch();

    const [value, setValue] = useState<string>("");

    const handleInputUpdate=(e: ChangeEvent<HTMLSelectElement>)=>{
        setValue(e.target.value)
    }

    const handleButtonClick=async(e: ChangeEvent<HTMLSelectElement>)=>{
        const userRes = await postUserApi(value)
        dispatch(addUser(userRes))
        dispatch(updateSta("selection"))
    }



    return (       
        <Container  padding={50} justifyContent="center" alignItems="center">
            <div className="join-modal">
                <p>redux test done</p>
                <Title titleTag={"h1"} text={appState} ></Title>
                <Title titleTag={"h4"} text={user.name} ></Title>
                <TextInput updateFunc={handleInputUpdate} inputLabel={""} placeholder={"Enter your name"} value={value} ></TextInput>
                <Spacer height={30}></Spacer>
                <Button onClick={handleButtonClick} label={"Enter"}></Button>
            </div>
        </Container>
    )
}

export default Join