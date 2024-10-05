import { ChangeEvent, FC, SyntheticEvent, useState,useEffect } from "react"
import Title from "../components/Title"
import TextInput from "../components/TextInput"
import Button from "../components/Button"
import Spacer from "../components/Spacer"
import Container from "../components/Container"

import { useDispatch,useSelector } from "react-redux"
import { RootState,AppDispatch } from "../redux/store"
import { addUser ,updateSta} from "../redux/userSlice"
import { postUserApi,createRoom } from "../fetch/userApi"
import { sendMessage } from "../fetch/wsApi"
import {joinRoom} from "../redux/roomSlice"
import './createroom.css'

export interface messageBody {
            sender:string;
            roomId:string;
            responseType:string;
            message:string;
        }


const CreateRoom:FC = ()=>{
    const user = useSelector((state:RootState)=> state.user)
    const appState = useSelector((state:RootState)=> state.appState)
    const dispatch:AppDispatch = useDispatch();
    useEffect(()=>setFormData({...formDate,users:[user.Id+"-"+user.username]}),[])

    interface body {
        roomName:string;
        userStories:string[];
        roomType:string;
        cards:string[];
        accessToAddStory:boolean;
        votingStatus:boolean;
        voteRevealedAtEnd:boolean;
        users: string[];
    }



    const initialState:body = {
        roomName: "",
        userStories: [],
        roomType: "scrum",
        cards: [],
        accessToAddStory: true,
        votingStatus: true,
        voteRevealedAtEnd: true,
        users:[]
    }

    const scrumArray:string[] = ["0",".5","1","2","3","5","8","13","20","40"]
    const fibArray:string[] = ["0",".5","1","2","3","5","8","13","21","34","55","89"]
    const seqArray:string[] = ["0","1","2","3","4","5","6","7","8","9","10"]
    const hourArray:string[] = ["0","1","2","3","4","6","8","12","16","24","32","40"]
    const cardArray:string[] = ["ace","2","3","5","8","King"]
    const tshirtArray:string[] = ["xs","s","m","l","xl","xxl"]

    var inputCards:string[] =[]

    const [formDate, setFormData] = useState<body>(initialState);
    const [cards, setCards] = useState<string[]>([])
    


    const handleInputUpdate=(e: ChangeEvent<HTMLSelectElement>)=>{
        setFormData({...formDate,roomName:e.target.value})
    }

    const selectHandler=(e:  ChangeEvent<HTMLSelectElement>)=>{
        setFormData({...formDate,roomType:e.target.value})
    }

    const checkBoxHandler=(e:  ChangeEvent<HTMLInputElement>)=>{
        getSelectedCards()
    }


    const adminCheckBoxHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formDate,accessToAddStory:e.target.checked})
        
    }

    const votingStatusCheckBoxHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formDate,votingStatus:e.target.checked})
        
    }

    const showVoteCheckBoxHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formDate,voteRevealedAtEnd:e.target.checked})
        
    }

    const submitForm=async (e:ChangeEvent<HTMLInputElement>)=>{
        console.log("body",formDate)
        const createRoomJson = await createRoom(formDate);

        console.log("jsonRoomObj.id",createRoomJson.id)
        if(createRoomJson.id){
           //connectRoom();
           dispatch(joinRoom(createRoomJson))
           dispatch(updateSta("joined"))
        }
    }

    const submitFormWS=(e:ChangeEvent<HTMLInputElement>)=>{
            setFormData({...formDate,users:[user.Id+"-"+user.username]})
            console.log("formDate",formDate)
            let bodyStringMessage:string = JSON.stringify(formDate)
            let message:messageBody={
                sender:user.Id+"-"+user.username,
                roomId:"creating",
                responseType:'CREATEGROUP',
                message:bodyStringMessage
            }
            console.log("submit form",bodyStringMessage)
            const delayedSend = setTimeout(()=>(sendMessage("/app/creategroup",message),40))
            }


    const cardItemSwitch=(roomType:string)=>{
        switch(roomType){
            case "scrum":
                return scrumArray
            case "fib":
                return fibArray
            case "tshirt":
                return tshirtArray
            case "sequential":
                return seqArray
            case "hours":
                return hourArray
            case "playing card":
                return cardArray
            default:
                return [""]
        }
            
    }

    const getSelectedCards=()=>{
    let cardsList:string[] =[]
        let cardElements = document.querySelectorAll(".cards .name-input")
        cardElements.forEach((item,index)=>{
        const checkboxEle = item as HTMLInputElement
            if(checkboxEle.checked && checkboxEle.value!== null){
                console.log(item)
                cardsList[index]=checkboxEle.value
            }
        })
        setFormData({...formDate,cards:cardsList})
    }



    return (       
        <Container  color="#001e2b" justifyContent="center" alignItems="center" classNames="modal-wrapper" padding={30}>
            <div className="create-room-modal">
                <Title titleTag={"h3"} text={"Create new room"}></Title>
                <Spacer height={20}></Spacer>
                <Container classNames="name-row" justifyContent={'space-between'}>
                    <Container width={60}>
                    <TextInput updateFunc={handleInputUpdate} inputLabel={""} placeholder={"Enter room name"} value={formDate.roomName}></TextInput>
                    </Container>
                    <Container width={30}>

                        <select onChange={selectHandler} id="estimation" name="estimation">
                            <option value="scrum">Scrum</option>
                            <option value="fib">Fibonacci</option>
                            <option value="tshirt">T-Shirt Sizes</option>
                            <option value="sequential">Sequential</option>
                            <option value="hours">Hours</option>
                            <option value="playing card">Playing Cards</option>
                        </select>
                    </Container>
                </Container>
                <p>Select the required cards for pointing</p>
                <Container>
                    {cardItemSwitch(formDate.roomType).map((item: string) => (
                        <Container >
                            <div className="cards"> 
                            <TextInput updateFunc={checkBoxHandler} inputLabel={item} type="checkbox" placeholder={""} value={item}></TextInput>
                            
                        
                        </div>
                        </Container>))}
                
                </Container>
                <Spacer height={30}></Spacer>
                <Container flexDirection={'column'} alignItems="flex-start">
                    <TextInput updateFunc={adminCheckBoxHandler} inputLabel="Do you want to enter stories in this room?" type="checkbox" placeholder={""}></TextInput>
                <br />
                <TextInput updateFunc={votingStatusCheckBoxHandler} inputLabel="Do you want to show voting" type="checkbox" placeholder={""}></TextInput>
                <br />
                <TextInput updateFunc={showVoteCheckBoxHandler} inputLabel="Do you want observers to see other players voting in real time?" type="checkbox" placeholder={""}></TextInput>
            

                </Container>
                <Spacer height={30}></Spacer>
                <Container width={100} justifyContent="center">
                <Container width={50} justifyContent="center">
                <Button onClick={submitFormWS} label={"Create"}></Button>
                </Container>
                <Container width={50} justifyContent="center">
                <Button onClick={() => dispatch(updateSta("selection"))} label={"Cancel"}></Button>
                </Container>
                </Container>
                
            </div>
        </Container>

    )
}

export default CreateRoom