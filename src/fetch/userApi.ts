import { METHODS } from "http"

export async function postUserApi(formData:any){
    const body={
        "username":formData.username,
        "email":formData.email,
        "password":formData.password,
        "Id":"",
        "token":""
    }
    console.log("body",body)
    console.log("json body",JSON.stringify(body))
    console.log("formData",formData)
    let userAdded;
    if(!formData.join){
        userAdded  = await fetch("http://localhost:8030/createUser", {
                method: "POST",  // Specifies the HTTP method as POST
                headers: {
                    'Content-Type': 'application/json',  // Specifies that the request body contains JSON data
                    'Access-Control-Allow-Origin': '*'  // Allows cross-origin requests from any origin
                },
                body: JSON.stringify(body),  // Converts the 'body' object to a JSON string
                mode:'cors'
            });
    }else{
         userAdded = await fetch("http://localhost:8030/loginUser", {
                method: "POST",  // Specifies the HTTP method as POST
                headers: {
                    'Content-Type': 'application/json',  // Specifies that the request body contains JSON data
                    'Access-Control-Allow-Origin': '*'  // Allows cross-origin requests from any origin
                },
                body: JSON.stringify(body),  // Converts the 'body' object to a JSON string
                mode:'cors'
            });
    }

    
     console.log("userAdded",userAdded.body)
     const userAddedJson = await userAdded.json()

     return userAddedJson
}

export async function createRoom(data:Object){
    const body=data
    const joinedGroup = await fetch("http://localhost:8030/addRoom", {
        method: "POST",  // Specifies the HTTP method as POST
        headers: {
            'Content-Type': 'application/json',  // Specifies that the request body contains JSON data
            'Access-Control-Allow-Origin': '*'  // Allows cross-origin requests from any origin
        },
        body: JSON.stringify(body),  // Converts the 'body' object to a JSON string
        mode:'cors'
    });
    
     console.log("roomDetails",joinedGroup)
     
     const joinedGroupJson = await joinedGroup.json()
     console.log("joinedGroupJson",joinedGroupJson)
     return joinedGroupJson

}

export async function joinGroupCall(data:string){
    const roomAdded = await fetch(`http://localhost:8030/joinRoom?id=${data}`, {
        method: "GET",  // Specifies the HTTP method as POST
        headers: {
            'Content-Type': 'application/json',  // Specifies that the request body contains JSON data
            'Access-Control-Allow-Origin': '*'  // Allows cross-origin requests from any origin
        },  // Converts the 'body' object to a JSON string
        mode:'cors'
    });

     console.log("roomAdded",roomAdded)

     const roomAddedJson = await roomAdded.json()
     console.log("roomAddedJson",roomAddedJson)
     return roomAddedJson

}

export async function addStory(story:Object){

    const storyAdded = await fetch(`http://localhost:8030/addStory`, {
        method: "POST",  // Specifies the HTTP method as POST
        headers: {
            'Content-Type': 'application/json',  // Specifies that the request body contains JSON data
            'Access-Control-Allow-Origin': '*'  // Allows cross-origin requests from any origin
        },  // Converts the 'body' object to a JSON string
        body: JSON.stringify(story),
        mode:'cors'
    });

     console.log("storyAdded",storyAdded)

     const updatedStoryArray = await storyAdded.json()
     console.log("updatedStoryArray",updatedStoryArray)
          return updatedStoryArray

}