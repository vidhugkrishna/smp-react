import { FC } from "react";
import * as React from 'react';
import Container from "./Container";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Title from "./Title";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {TabContext,TabList,TabPanel} from '@mui/lab';
import {joinRoom, UserStory} from "../redux/roomSlice"
import StoryTag from "../components/StoryTag";
import { useMediaQuery } from "@mui/material";


const StorySection:FC=()=>{
    const user = useSelector((state:RootState)=> state.user)
    const roomState = useSelector((state:RootState)=> state.room)
    const storyState = useSelector((state:RootState)=> state.story)
    const [value, setValue] = React.useState('1');
    const matches: boolean = useMediaQuery("(min-width:600px)");

      const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
      };

       const isAdmin=()=>{
                  console.log("uuuuuuuuuu",roomState.users[0]==user.Id,roomState.users[0],user.Id)
                  return (roomState.users[0].slice(0,roomState.users[0].indexOf("-"))==user.Id)
             }



    return ( <Box sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext  value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', color:"green" }}>
                      <TabList onChange={handleChange} centered aria-label="lab API tabs example">
                        <Tab sx={{color:"green", fontSize:14}} label={matches ? "All stories" : "All"} value="1" />
                        <Tab sx={{color:"green"}} label={matches ? "Active stories" : "Active"} value="2" />
                        <Tab sx={{color:"green"}} label={matches ? "Completed stories" : "Completed"} value="3" />
                      </TabList>
                    </Box>
                    <TabPanel  value="1">
                        {roomState.userStories.map((item:UserStory)=>(
                            <StoryTag isAdmin={isAdmin()} item={item}/>
                        ))}
                    </TabPanel>
                    <TabPanel value="2">
                        {roomState.userStories.map((item:UserStory)=>(
                        item.vote.length == 0 ? (
                            <StoryTag isAdmin={isAdmin()} item={item}/>
                            ) : null
                        ))}
                    </TabPanel>
                    <TabPanel value="3">
                        {roomState.userStories.map((item:UserStory)=>(
                        item.vote.length > 0 ? (
                            <StoryTag isAdmin={isAdmin()} item={item}/>
                            ) : null
                        ))}
                    </TabPanel>
                  </TabContext>
                </Box>
    )

    

    
}
export default StorySection;