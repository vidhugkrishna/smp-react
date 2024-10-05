
import {useEffect} from "react"
import './App.css';
import Join from './components/Join';
import Nav from './components/Nav';
import StorySection from './components/StorySection';
import Container from './components/Container'
import { addUser ,updateSta} from "./redux/userSlice"
import { useDispatch,useSelector } from "react-redux"
import { RootState,AppDispatch } from "./redux/store"
import CreateRoom from './pageComponents/CreateRoom';
import RoomSection from './pageComponents/RoomSection';
import JoinRoom from './pageComponents/JoinRoom';
import Room from './pageComponents/Room';
import {messageBody} from "./types/typeFiles"
import { connectRoom,subscribeUser,sendMessage } from "./fetch/wsApi"


function App() {
  const user = useSelector((state:RootState)=> state.user)
  const appState = useSelector((state:RootState)=> state.appState)
  const roomState = useSelector((state:RootState)=> state.room)
  const dispatch:AppDispatch = useDispatch();

useEffect(()=>checkForLoginCredInLocal(),[])

function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const checkForLoginCredInLocal=()=>{
    console.log("this should be the first connect")
    connectRoom()
    var userRes = localStorage.getItem("loginCred");
    console.log("userRes-localstorage",userRes)
    if(userRes){
    var userObj = JSON.parse(userRes)
    userObj["login"] = true
    console.log("dispatch",userObj)
    dispatch(addUser(userObj))
    //subscribeUser(userObj.Id)
    const queryString = window.location.search;
    if(queryString.includes("roomId")){
    const roomId = queryString.slice(queryString.indexOf("roomId")+7)
        console.log("roomid from url",roomId)
        console.log("user state",user)
        let message:messageBody={
                                    sender:userObj.Id+"-"+userObj.username,
                                    roomId:"joining",
                                    responseType:'JOINGROUP',
                                    message:roomId
                                }
        console.log("message",message)
        sleep(2000).then(() => { sendMessage("/app/joingroup",message)});
        let getMessage:messageBody={
                            sender:userObj.Id+"-"+userObj.username,
                            roomId:roomId,
                            responseType:'GETCURRENTSTORY',
                            message:""
                        }
            console.log("submit form for get",getMessage)
        sleep(2000).then(() => { sendMessage("/app/getCurrentStory",getMessage)});

    }else{
    dispatch(updateSta("selection"))
    console.log("user",user)
    }
    }
}


  const renderSwitch=(appState : string)=>{
    switch(appState) {
      case 'createRoom':
        return <CreateRoom></CreateRoom>
      case 'selection':
        return <RoomSection/>
      case 'joinRoom':
        return <JoinRoom/>
      case 'joined':
        return <Room/>
      default:
        return <Join/>;
    }
  }
  return (

    <div className="App">
      <Nav></Nav>
      <div style={{height:'100vh'}}>
        <Container color="white" justifyContent="center" alignItems="center" height={100}>
            {renderSwitch(appState)}
        </Container>
       </div>
    </div>
  );
}

export default App;
