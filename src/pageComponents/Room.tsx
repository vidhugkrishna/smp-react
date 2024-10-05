import { FC,useState, ChangeEvent,useCallback,useEffect } from "react";
import Container from "../components/Container";
import Title from "../components/Title";
import Chart from "../components/Chart";
import TextInput from "../components/TextInput";
import Spacer from "../components/Spacer";
import Button from "../components/Button";
import StoryTag from "../components/StoryTag";
import UserTag from "../components/UserTag";
import StorySection from "../components/StorySection";
import Join from "../components/Join";
import RoomSection from "./RoomSection";
import AddStory from "./AddStory";
import {joinGroupCall} from "../fetch/userApi";
import { useDispatch,useSelector } from "react-redux"
import {joinRoom, UserStory} from "../redux/roomSlice"
import { updateSta,updateStoryVote} from "../redux/userSlice"
import { RootState,AppDispatch } from "../redux/store"
import OutlinedCard from "../components/Card";
import { useMediaQuery } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import './room.css'


const Room: FC = ()=>{

     const [value, setValue] = useState<string>("");
     const [finish, setFinished] = useState<boolean>();
     const matches: boolean = useMediaQuery("(min-width:600px)");
     const dispatch:AppDispatch = useDispatch();
     const roomState = useSelector((state:RootState)=> state.room)
      const userState = useSelector((state:RootState)=> state.user)
      const storyState = useSelector((state:RootState)=> state.story)
 useEffect(()=>updateStoryStatus(),[roomState])
 useEffect(()=>(setFinished(false)),[storyState])

 const updateStoryStatus =()=>{
    console.log("updateStorySta")
    const storiesList = roomState.userStories
    storiesList.forEach(storyItem=>{
        if(storyItem.storyDetail===storyState.storyDetail){
        console.log("updateStorySta999999")
            dispatch(updateStoryVote(storyItem))
        }
    })
 }

        const handleInputUpdate=(e: ChangeEvent<HTMLSelectElement>)=>{
            setValue(e.target.value)
        }

        const handleButtonClick=async(e: ChangeEvent<HTMLSelectElement>)=>{
            const groupRes = await joinGroupCall(value)
            dispatch(joinRoom(groupRes))
            dispatch(updateSta("joined"))
        }

        const isAdmin=()=>{
            console.log("isAdmin",(roomState.users[0].slice(0,roomState.users[0].indexOf("-"))))
            return (roomState.users[0].slice(0,roomState.users[0].indexOf("-"))==userState.Id)
       }

       const finishVote=(e:ChangeEvent<HTMLSelectElement>)=>{
          setFinished(true)
       }

       const handleFinalInput=(e:ChangeEvent<HTMLSelectElement>)=>{
                 setFinished(true)
              }




    return (

            <Container classNames="room-body" width={100} height={100} justifyContent="center" alignItems="center" flexDirection="column">
                <Container width={matches ? 90 : 100} height={80} justifyContent="center" alignItems="center">

                        <Container width={matches ? 75 : 100}  height={80} justifyContent="center" alignItems="center" flexDirection="column">
                                <Container classNames="current-story" width={matches ? 75 : 100}  flexDirection="row" justifyContent="space-between">
                                    <Title text={storyState.storyDetail} titleTag="h1"/>
                                    {(storyState.storyDetail && !finish)&& <Button onClick={finishVote} label="Finish voting"></Button>}

                                </Container>
                                <Spacer height={20}></Spacer>
                                {!finish ? <Container width={100} height={matches ? 50 : 100} flexDirection="row"  justifyContent="center">
                                    <OutlinedCard/>
                                </Container> : <Chart/>}

                                {!matches &&
                                <Container width={90} classNames="svp-user-section"  justifyContent="center" alignItems="center" flexDirection="column">
                                                            <UserTag/>
                                                        </Container>}
                                <Spacer height={30}></Spacer>
                                <Container width={100} height={matches ? 20 : 100} justifyContent="center">
                                    {isAdmin() ? <AddStory/> : <p className="admin-mes" >Admin can only add story</p>}
                                 </Container>
                                 <Spacer height={30}></Spacer>
                                <Container width={100} height={matches ? 30 : 100} flexDirection="column">
                                    {<StorySection/>}
                                </Container>

                        </Container>
                        {matches &&
                        <Container classNames="lvp" width={25} height={80} justifyContent="center" alignItems="center" flexDirection="column">
                                                    <UserTag/>
                                                </Container>}


                </Container>

            </Container>

    )

}

export default Room