import { ChangeEvent, FC, useState } from "react"


import { useDispatch,useSelector } from "react-redux"
import { RootState,AppDispatch } from "../redux/store"
import { addUser ,updateSta} from "../redux/userSlice"
import { postUserApi } from "../fetch/userApi"
import Container from "../components/Container"
import Button from "../components/Button"
import "./roomsection.css"

const RoomSection:FC = ()=>{
    const user = useSelector((state:RootState)=> state.user)
    const reduxTextVal = useSelector((state:RootState)=> state.appState)
    const dispatch:AppDispatch = useDispatch();

    const [value, setValue] = useState<string>("");

    const handleInputUpdate=(e: ChangeEvent<HTMLSelectElement>)=>{
        setValue(e.target.value)
    }

    const handleButtonClick=async(e: ChangeEvent<HTMLSelectElement>)=>{
        const userRes = await postUserApi(value)
        dispatch(addUser(userRes))
    }



    return (       
        <Container classNames="roomselect-modal" width={80} padding={50} justifyContent="center" alignItems="center" color="#357960">

            <Container width={100} justifyContent="center" >
                <Button classNames="create-room" onClick={()=>dispatch(updateSta("createRoom"))} label={"Create Room"}></Button>
                <Button classNames="join-room" onClick={()=>dispatch(updateSta("joinRoom"))} label={"Join room"}></Button>
            </Container>

        </Container>
    )
}

export default RoomSection