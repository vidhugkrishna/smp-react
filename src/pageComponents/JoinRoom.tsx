import { FC,useState, ChangeEvent } from "react";
import Container from "../components/Container";
import Title from "../components/Title";
import TextInput from "../components/TextInput";
import Spacer from "../components/Spacer";
import Button from "../components/Button";
import Join from "../components/Join";
import RoomSection from "./RoomSection";
import {joinGroupCall} from "../fetch/userApi";
import { useDispatch,useSelector } from "react-redux"
import {joinRoom} from "../redux/roomSlice"
import { updateSta} from "../redux/userSlice"
import { RootState,AppDispatch } from "../redux/store"
import { connectRoom,sendMessage} from "../fetch/wsApi"
import {messageBody} from "../pageComponents/CreateRoom"


const JoinRoom: FC = ()=>{

     const user = useSelector((state:RootState)=> state.user)
     const [value, setValue] = useState<string>("");
     const dispatch:AppDispatch = useDispatch();
     const roomState = useSelector((state:RootState)=> state.room)

        const handleInputUpdate=(e: ChangeEvent<HTMLSelectElement>)=>{
            setValue(e.target.value)
        }

        const handleButtonClick=async(e: ChangeEvent<HTMLSelectElement>)=>{
            const groupRes = await joinGroupCall(value)

            console.log("groupRes.id",groupRes.id)
                    if(groupRes.id){
                       // connectRoom();
                       dispatch(joinRoom(groupRes))
                       dispatch(updateSta("joined"))
                    }
        }

        const handleButtonClickWS=async(e: ChangeEvent<HTMLSelectElement>)=>{
                    let message:messageBody={
                                    sender:user.Id+"-"+user.username,
                                    roomId:"joining",
                                    responseType:'JOINGROUP',
                                    message:value
                                }
                    console.log("message",message)
                    sendMessage("/app/joingroup",message)
                }

    return (

            <Container classNames="roomselect-modal" width={80} height={40} padding={50} justifyContent="center" alignItems="center" color="#357960">
                <Container width={100} justifyContent="center" flexDirection="column">
                    <Title titleTag={"h4"} text="Join with ID" ></Title>
                    <Spacer height={20}></Spacer>
                    <TextInput  updateFunc={handleInputUpdate} inputLabel={""} placeholder={"Enter your group id"} value={value} ></TextInput>
                    <Spacer height={20}></Spacer>
                    <Button onClick={handleButtonClickWS} label={"Enter"}></Button>
                </Container>
            </Container>

    )

}

export default JoinRoom