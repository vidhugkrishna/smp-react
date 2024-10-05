import { useState,FC, ChangeEvent, useEffect } from "react";
import Container from "../components/Container";
import Title from "../components/Title";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Join from "../components/Join";
import RoomSection from "./RoomSection";
import {addStory} from "../fetch/userApi";
import Spacer from "../components/Spacer"
import { RootState,AppDispatch } from "../redux/store"
import { useDispatch,useSelector } from "react-redux"
import {joinRoom} from "../redux/roomSlice"
import {sendMessage} from "../fetch/wsApi"



const AddStory: FC = ()=>{
const dispatch:AppDispatch = useDispatch();
useEffect(()=>setStory({...story,roomID:roomState.id}),[])

interface bodyStory {
        storyDetail:string;
        vote:string[];
        roomID:string;
    }

     interface messageBody {
                sender:string;
                roomId:string;
                responseType:string;
                message:string;
            }

    const initialState:bodyStory = {
            storyDetail: "",
            vote: [],
            roomID: "scrum"
        }

    const[story,setStory] = useState<bodyStory>(initialState);
    const roomState = useSelector((state:RootState)=> state.room)
    const user = useSelector((state:RootState)=> state.user)

    const handleInputUpdate=(e: ChangeEvent<HTMLSelectElement>)=>{
        setStory({...story,storyDetail:e.target.value})
    }

    const handleButtonClick=async(e: ChangeEvent<HTMLSelectElement>)=>{
        setStory({...story,roomID:roomState.id})
        const storyAdded = await addStory(story)
        const storyListUpdate = await storyAdded
        dispatch(joinRoom(storyAdded))
    }

    const addStorymWS=(e:ChangeEvent<HTMLInputElement>)=>{
                console.log("roomState",roomState)
                console.log("story",story)
                setStory({...story,roomID:roomState.id})
                let bodyStringMessage:string = JSON.stringify(story)
                console.log("bodyStringMessage",bodyStringMessage)
                let message:messageBody={
                                        sender:user.Id,
                                        roomId:roomState.id,
                                        responseType:'STORYADDED',
                                        message:bodyStringMessage
                                    }
                console.log("message",message)
                console.log("story v111",story)
                const delayedSend = setTimeout(()=>(sendMessage("/app/addstory",message),40))
                }

    return (
        
            <Container classNames="addstory" justifyContent="center" alignItems="center" flexDirection="row">
                <Container classNames="input-tag"  height={100} flexDirection="column">
                       <Title titleTag={"h5"} text="Add stories here." ></Title>
                       <Spacer height={20}></Spacer>
                       <TextInput updateFunc={handleInputUpdate} inputLabel={""} placeholder={"Enter user story details"} value={story.storyDetail} ></TextInput>
                </Container>
                <Container width={30} height={100}>
                {story&& <Button onClick={addStorymWS} label={"Enter"}></Button> }
                </Container>

            </Container>
        
    )

}

export default AddStory