import { METHODS } from "http"

export async function postUserApi(name:string){
    const body={
        "name":name
    }
    const userAdded = await fetch("http://localhost:8080/createUser", {
        method: "POST",  // Specifies the HTTP method as POST
        headers: {
            'Content-Type': 'application/json',  // Specifies that the request body contains JSON data
            'Access-Control-Allow-Origin': '*'  // Allows cross-origin requests from any origin
        },
        body: JSON.stringify(body),  // Converts the 'body' object to a JSON string
        mode:'cors'
    });
    
     console.log("userAdded",userAdded)
     
     const userAddedJson = await userAdded.json()
     userAddedJson["login"]=true
     console.log("userAddedJson",userAddedJson)
     return userAddedJson

}

export async function createRoom(data:Object){
    const body=data
    const roomAdded = await fetch("http://localhost:8080/addRoom", {
        method: "POST",  // Specifies the HTTP method as POST
        headers: {
            'Content-Type': 'application/json',  // Specifies that the request body contains JSON data
            'Access-Control-Allow-Origin': '*'  // Allows cross-origin requests from any origin
        },
        body: JSON.stringify(body),  // Converts the 'body' object to a JSON string
        mode:'cors'
    });
    
     console.log("userAdded",roomAdded)
     
     const roomAddedJson = await roomAdded.json()
     console.log("roomAddedJson",roomAddedJson)
     return roomAddedJson

}