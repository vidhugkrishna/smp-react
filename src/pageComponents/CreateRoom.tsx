import { ChangeEvent, FC, useState } from "react"
import Title from "../components/Title"
import TextInput from "../components/TextInput"
import Button from "../components/Button"
import Spacer from "../components/Spacer"
import Container from "../components/Container"

import { useDispatch,useSelector } from "react-redux"
import { RootState,AppDispatch } from "../redux/store"
import { addUser ,updateSta} from "../redux/userSlice"
import { postUserApi } from "../fetch/userApi"

const CreateRoom:FC = ()=>{
    const user = useSelector((state:RootState)=> state.user)
    const appState = useSelector((state:RootState)=> state.appState)
    const dispatch:AppDispatch = useDispatch();

    interface body {
        roomName:string;
        userStories:string[];
        roomType:string;
        cards:string[];
        accessToAddStory:boolean;
        votingStatus:boolean;
        voteRevealedAtEnd:boolean;
    
    }


    const initialState:body = {
        roomName: "",
        userStories: [],
        roomType: "",
        cards: [],
        accessToAddStory: true,
        votingStatus: true,
        voteRevealedAtEnd: true
    }

    const [formDate, setFormData] = useState<body>(initialState);


    const handleInputUpdate=(e: ChangeEvent<HTMLSelectElement>)=>{
        setFormData({...formDate,roomName:e.target.value})
    }




    return (       
        <Container  padding={50} justifyContent="center" alignItems="center">
            <div className="create-room-modal">
                <Title titleTag={"h3"} text={"Create new room"} ></Title>
                <Container justifyContent={'space-between'}>
                <TextInput updateFunc={handleInputUpdate} inputLabel={""} placeholder={"Enter room name"} value={formDate.roomName} ></TextInput>
                <div>

                    <select id="estimation" name="estimation">
                    <option value="scrum">Scrum</option>
                    <option value="fib">Fibonacci</option>
                    <option value="tshirt">T-Shirt Sizes</option>
                    <option value="sequential">Sequential</option>
                    <option value="hours">Hours</option>
                    <option value="playing card">Playing Cards</option>
                    </select>
                </div>
                </Container>
                <Spacer height={30}></Spacer>
                <Container flexDirection={'column'} alignItems="flex-start">
                <label>
  <input type="checkbox" name="enter_stories"/> Do you want to enter stories in this room?
</label>
<br/>
<label>
  <input type="checkbox" name="request_confirmation"/> Do you want to show voting
</label>
<br/>
<label>
  <input type="checkbox" name="observe_realtime"/> Do you want observers to see other players voting in real time?
</label>

                </Container>
                <Spacer height={30}></Spacer>
                <Container justifyContent="center">
                <Button onClick={()=>console.log("d")} label={"Create"}></Button>
                <Button onClick={()=>dispatch(updateSta("selection"))} label={"Cancel"}></Button>

                </Container>
                
            </div>
        </Container>
    )
}

export default CreateRoom