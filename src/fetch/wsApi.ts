 import * as SockJS from "sockjs-client"
 import * as Stomp from 'stompjs';
 import {messageBody} from "../pageComponents/CreateRoom"
 import {joinRoom,addUsers,addStories} from "../redux/roomSlice"
 import { updateSta,updateStorySta, updateStoryVote} from "../redux/userSlice"
import store from "../redux/store"
import { useDispatch,useSelector } from "react-redux"

var sockClient:any=null
var roomIdValue:string=""



 export const connectRoom= ()=>{
 console.log("inside connect")
            var Sock = new SockJS.default('http://localhost:8030/smpwebsockets')
            sockClient = Stomp.over(Sock)
            sockClient.connect({},onConnected,onError)

        }

         const onConnected = ()=>{
                console.log("connected")
                console.log("getState ",store.getState())
                sockClient.subscribe('/global/activities',onGlobalMessage)
                if(store.getState().user.Id){
                    sockClient.subscribe(`/user/${store.getState().user.Id}/group/notification`,onPrivateMessage1)
                }

         }

         const onGlobalMessage=(payload:any)=>{
            console.log("onGlobalMessage",payload)
         }



        const onGroupMessage=(payload:any)=>{

        console.log("new user added")

        }

        const onError = ()=>{
                console.log("error")
        }

 export const sendMessage=(path:string,message:messageBody)=>{
        console.log("message send")
        sockClient.send(path,{},JSON.stringify(message))
 }

 const responseHandler=(payload:any)=>{
        console.log("switch ",payload.responseType)
        console.log("getState ",store.getState())
        switch(payload.responseType){
            case 'GROUPCREATED':{
                handleCreateRoomResponse(payload)
                break;
            }
            case 'GROUPJOINED':{
                handleJoinRoomResponse(payload)
                break;
            }
            case 'STORYADDED':{
                handleJoinRoomResponse(payload)
                break;
            }
            case 'STORYVOTED':{
                handleJoinRoomResponse(payload)
                break;
            }
            case 'STORYUPDATED':{
                handleStoryUpdateResponse(payload)
                break;
            }
        }
 }

 const handleCreateRoomResponse=(payload:any)=>{
    const res = JSON.parse(payload.message)
    console.log("res ",res)
               if(res.id){
               store.dispatch(joinRoom(res))
               store.dispatch(updateSta("joined"))
            }
 }

 const handleJoinRoomResponse=(payload:any)=>{
     const res = JSON.parse(payload.message)
     console.log("res ",res)
                if(res.id==store.getState().room.users[0]){
                store.dispatch(addUsers(res))}
                else{
                store.dispatch(joinRoom(res))
                store.dispatch(updateStorySta(res.currentStory))
                }
                store.dispatch(updateSta("joined"))
     console.log("-----",store.getState())

  }

  const handleStoryResponse=(payload:any)=>{
       const res = JSON.parse(payload.message)
       store.dispatch(addStories(res.userStories))
       console.log("-----",store.getState())
}
const handleStoryUpdateResponse=(payload:any)=>{
    //67010f6190a8d57eb8838151
    console.log("inside handleStoryUpdateResponse")
    if(store.getState().story!==payload.message){
        console.log("inside handleStoryUpdateResponse condition")
       store.dispatch(updateStorySta(payload.message))
       store.getState().room.userStories.forEach(storyItem=>{
               if(storyItem.storyDetail===payload.message){
               console.log("updateStorySta999999")
                   store.dispatch(updateStoryVote(storyItem))
               }
           })
   }
}

  const onPrivateMessage=(payload:any)=>{
            console.log("payloadData --")
             const payloadData = JSON.parse(payload.body)
             console.log("payloadData ",payloadData)
             console.log("payload ",payloadData.responseType)
             responseHandler(payloadData)
             sockClient.subscribe(`/room/${payloadData.roomId}/message`, onGroupMessage)
         }

export const subscribeUser = (id:string)=>{
                console.log("connected")
                sockClient.subscribe(`/user/${id}/group/notification`,onPrivateMessage1)

         }

         const onPrivateMessage1=(payload:any)=>{console.log("payloadData --")
              const payloadData = JSON.parse(payload.body)
              console.log("payloadData ",payloadData)
              console.log("payload ",payloadData.responseType)
              responseHandler(payloadData)
              sockClient.subscribe(`/room/${payloadData.roomId}/message`, onGroupMessage1)
         }

         const onGroupMessage1=(payload:any)=>{
                 const payloadData = JSON.parse(payload.body)
                 console.log("new user added",payloadData)
                 responseHandler(payloadData)

                 }

