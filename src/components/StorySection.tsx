import { FC } from "react";
import Container from "./Container";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Title from "./Title";

const StorySection:FC=()=>{
    const user = useSelector((state:RootState)=> state.user)

    return (<div>
        <Container width={100} alignItems="space-between">
            <Container width={30}><Title titleTag="h4" text="Active stories"></Title></Container>
            <Container width={30}><Title titleTag="h4" text="Completed stories"></Title></Container>
            <Container width={30}><Title titleTag="h4" text="All stories"></Title></Container>
            <Container width={10}><Title titleTag="h4" text="+ New"></Title></Container>
        </Container>
        <Container>
            <div>loop the stories here</div>
        </Container>
        </div>
    )

    

    
}
export default StorySection;