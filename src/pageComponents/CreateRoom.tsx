import { ChangeEvent, FC, SyntheticEvent, useState } from "react"
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
        roomType: "scrum",
        cards: [],
        accessToAddStory: true,
        votingStatus: true,
        voteRevealedAtEnd: true
    }

    const scrumArray:string[] = ["0",".5","1","2","3","5","8","13","20","40"]
    const fibArray:string[] = ["0",".5","1","2","3","5","8","13","21","34","55","89"]
    const seqArray:string[] = ["0","1","2","3","4","5","6","7","8","9","10"]
    const hourArray:string[] = ["0","1","2","3","4","6","8","12","16","24","32","40"]
    const cardArray:string[] = ["ace","2","3","5","8","King"]
    const tshirtArray:string[] = ["xs","s","m","l","xl","xxl"]

    const [formDate, setFormData] = useState<body>(initialState);


    const handleInputUpdate=(e: ChangeEvent<HTMLSelectElement>)=>{
        setFormData({...formDate,roomName:e.target.value})
    }

    const selectHandler=(e:  ChangeEvent<HTMLSelectElement>)=>{
        setFormData({...formDate,roomType:e.target.value})
    }

    const checkBoxHandler=(e:  ChangeEvent<HTMLInputElement>)=>{
        var checkedBool =e.target.checked
        console.log("checkedBool",checkedBool)
        e.target.checked=!checkedBool
        
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



    return (       
        <><Container padding={50} justifyContent="center" alignItems="center">
            <div className="create-room-modal">
                <Title titleTag={"h3"} text={"Create new room"}></Title>
                <Container justifyContent={'space-between'}>
                    <TextInput updateFunc={handleInputUpdate} inputLabel={""} placeholder={"Enter room name"} value={formDate.roomName}></TextInput>
                    <div>

                        <select onChange={selectHandler} id="estimation" name="estimation">
                            <option value="scrum">Scrum</option>
                            <option value="fib">Fibonacci</option>
                            <option value="tshirt">T-Shirt Sizes</option>
                            <option value="sequential">Sequential</option>
                            <option value="hours">Hours</option>
                            <option value="playing card">Playing Cards</option>
                        </select>
                    </div>
                </Container>
                <Container>
                    {cardItemSwitch(formDate.roomType).map((item: string) => (
                        <Container>
                            <div> 
                            <input  type="checkbox"  value={item} checked={false} name="enter_stories" onChange={checkBoxHandler}/>{item}
                        <label/>
                        </div>
                        </Container>))}
                
                </Container>
                <Spacer height={30}></Spacer>
                <Container flexDirection={'column'} alignItems="flex-start">
                <label>
                    <input type="checkbox" name="enter_stories" /> Do you want to enter stories in this room?
                </label>
                <br />
                <label>
                    <input type="checkbox" name="request_confirmation" /> Do you want to show voting
                </label>
                <br />
                <label>
                    <input type="checkbox" name="observe_realtime" /> Do you want observers to see other players voting in real time?
                </label>

                </Container>
                <Spacer height={30}></Spacer>
                <Container justifyContent="center">
                <Button onClick={() => console.log("d")} label={"Create"}></Button>
                <Button onClick={() => dispatch(updateSta("selection"))} label={"Cancel"}></Button>

                </Container>
                
            </div>
        </Container>
        </>
    )
}

export default CreateRoom