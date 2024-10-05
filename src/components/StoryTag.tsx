import { FC,MouseEvent } from "react";
import Title from "./Title"
import Container from "./Container"
import { useDispatch,useSelector } from "react-redux"
import { RootState,AppDispatch } from "../redux/store"
import { updateStorySta} from "../redux/userSlice"
import {messageBody} from "../types/typeFiles"
import { sendMessage } from "../fetch/wsApi"

interface userStory {
        storyDetail:string;
        vote:string[];
        roomID:string;
    }

    interface StoryTagProps {
            item:userStory;
            isAdmin:boolean;
        }


const StoryTag:FC<StoryTagProps> = ({item,isAdmin})=>{

const roomState = useSelector((state:RootState)=> state.room)

const dispatch:AppDispatch = useDispatch();
const storySelection=(e:MouseEvent<HTMLButtonElement>)=>{
    if(isAdmin){
        dispatch(updateStorySta(item.storyDetail))
    }
    let message:messageBody={
                    sender:"user.Iduser.username",
                    roomId:roomState.id,
                    responseType:'STORYUPDATED',
                    message:item.storyDetail
                }
    console.log("submit form",message)
    sendMessage("/app/updatestory",message)

}

    return  (
        <Container classNames="story-tag" justifyContent="center">
            <Container width={80} classNames="story-wrapper">
                <p>{item.storyDetail}</p>
                {isAdmin ? <button  onClick={storySelection} type="submit" >Proceed to vote</button> : ""}
            </Container>
        </Container>
    )
}

export default StoryTag;