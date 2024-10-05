import { FC,MouseEvent } from "react";
import Title from "./Title"
import Container from "./Container"
import { useDispatch,useSelector } from "react-redux"
import { RootState,AppDispatch } from "../redux/store"
import { updateStorySta} from "../redux/userSlice"
import {messageBody} from "../types/typeFiles"
import { sendMessage } from "../fetch/wsApi"


const UserTag:FC = ()=>{

const roomState = useSelector((state:RootState)=> state.room)
const storyState = useSelector((state:RootState)=> state.story)

const viewNameVote = (item: string) => {
            console.log("##################");
            const voteList = storyState.votes;
            console.log("item", item);
            console.log("voteList", voteList);

            if (voteList.length === 0) {
                //return item.slice(item.indexOf("-") + 1);
                return "yet to vote"
            }

            for (const voteItem of voteList) {
                console.log("============================");
                console.log("voteItem", voteItem);
                const condition = voteItem.includes(item.slice(0, item.indexOf("-") + 1));
                console.log("condition", condition);

                if (condition) {
                    const voteVal = voteItem.slice(voteItem.indexOf("#vote") + 5);
                    console.log("voteVal", item.slice(item.indexOf("-") + 1) + "  " + voteVal);
                    return voteVal;
                } else {
                    console.log("y here 1");
                }
                console.log("============================");
            }

            return "not yet voted";
        };

    return  (
        <Container classNames="user-section" width={100} justifyContent="center" flexDirection='column'>
        <h2>Users</h2>
            <Container flexDirection='column' width={100} classNames="story-wrapper">

                 {roomState.users.map((item:string)=>(
                         <Container classNames="user-tag" width={100} flexDirection='row'>
                         <Container justifyContent="center" width={100} >
                         <p>{item.slice(item.indexOf("-") + 1)}</p>
                         </Container>
                         {storyState.storyDetail &&
                         <Container classNames="vote" justifyContent="center" width={100}>
                         <p>{viewNameVote(item)}</p>
                         </Container>
                         }
                         </Container>
                 ))}
            </Container>
        </Container>
    )
}

export default UserTag;