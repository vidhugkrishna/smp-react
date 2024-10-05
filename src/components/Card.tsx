import {FC,ChangeEvent,MouseEvent,useState,useEffect} from "react";
import Card from '@mui/material/Card';
//import ButtonBase from '@material-ui/core/ButtonBase';
import ButtonBase from '@mui/material/ButtonBase';
import Container from "../components/Container"
import { RootState,AppDispatch } from "../redux/store"
import { useDispatch,useSelector } from "react-redux"
import { sendMessage } from "../fetch/wsApi"
import { useMediaQuery } from "@mui/material";



interface messageBody {
            sender:string;
            roomId:string;
            responseType:string;
            message:string;
        }
interface senderBody {
            userstory:string;
            vote:string;
        }

        const initial:senderBody={
            userstory:"",
            vote:""
        }

  export default function OutlinedCard() {
  const matches: boolean = useMediaQuery("(min-width:600px)");
  const roomState = useSelector((state:RootState)=> state.room)
  const user = useSelector((state:RootState)=> state.user)
  const story = useSelector((state:RootState)=> state.story)
  const [voteValue, setVoteValue] = useState<string>("");
  const [senderValue, setSenderValue] = useState<senderBody>(initial);
  useEffect(()=>setSenderValue({...senderValue,userstory:story.storyDetail}),[story])



  const updateVote = (e:MouseEvent<HTMLButtonElement>)=>{
        const target = e.target as HTMLTextAreaElement
        const element = target.className
        const userVote = element.slice(element.indexOf("-")+1,element.length)
        console.log("userVote",userVote)
        if(voteValue!==userVote){
            setVoteValue(userVote)
            let senderValueString:string = JSON.stringify({...senderValue,vote:userVote})
            let message:messageBody={
                                    sender:user.Id+"-"+user.username,
                                    roomId:roomState.id,
                                    responseType:'VOTE',
                                    message:senderValueString
                                }
                                console.log("message",message)
                                sendMessage("/app/votestory",message)
        }

  }
    return (
      <Container classNames={matches ? "lvp-card-wrapper" : "svp-card-wrapper"}>
      {roomState.cards.filter(item=>item!=null).map((item: string) => (
        <Card sx={{ minWidth: 150, backgroundColor : '#00ED64' , marginRight: '20px'}} variant="outlined" >
            <ButtonBase sx={{width:'100%',height:'100%'}}
                      className={item}
                      onClick={updateVote}
                  >

            <Container classNames={"card card-"+item} width={100} height={100} justifyContent="center" alignItems="center">
                <h2>{item}</h2>
            </Container>
            </ButtonBase>
        </Card>
        ))}
      </Container>
    );
  }
