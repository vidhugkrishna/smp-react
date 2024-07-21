import { ChangeEvent, FC, useState } from "react"


import { useDispatch,useSelector } from "react-redux"
import { RootState,AppDispatch } from "../redux/store"
import { addUser ,updateSta} from "../redux/userSlice"
import { postUserApi } from "../fetch/userApi"
import Container from "../components/Container"
import Button from "../components/Button"

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
        <Container  padding={50} justifyContent="center" alignItems="center">
            <div className="room-modal">
                <Container>
                <Button onClick={()=>dispatch(updateSta("createRoom"))} label={"Create Room"}></Button>
                <Button onClick={()=>dispatch(updateSta("joinRoom"))} label={"Join room"}></Button>
                </Container>
                
            </div>
        </Container>
    )
}

export default RoomSection