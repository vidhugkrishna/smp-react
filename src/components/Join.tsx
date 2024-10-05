import { ChangeEvent, FC, useState, useEffect, useRef } from "react"
import Title from "./Title"
import TextInput from "./TextInput"
import Button from "./Button"
import Spacer from "./Spacer"
import Container from "./Container"

import { useDispatch,useSelector } from "react-redux"
import { RootState,AppDispatch } from "../redux/store"
import { addUser ,updateSta} from "../redux/userSlice"
import { postUserApi } from "../fetch/userApi"
import { connectRoom,subscribeUser } from "../fetch/wsApi"
import './join.css';







const Join:FC = ()=>{
    const user = useSelector((state:RootState)=> state.user)
    const appState = useSelector((state:RootState)=> state.appState)
    const dispatch:AppDispatch = useDispatch();


    interface form {
      username: string;
      password: string;
      email:string;
      join: boolean;
    }
    const initialStateForm:form = {
            username: "",
            password: "",
            email:"",
            join: true,
}
const [value, setValue] = useState<form>(initialStateForm);
    const [loginType, setLoginType] = useState<string>("join");
    const [error, setError] = useState<string>("pass");
    const handleJoinToggle = () => {
                                //const list = e.classList;
                                //list.toggle("hidden");
                                console.log("here")
                                if(loginType=="join"){
                                    console.log("here join should become true")
                                    setValue({...value,join:true})
                                }else if(loginType=="create"){
                                console.log("here join should become false")
                                    setValue({...value,join:false})
                                }

                            };

    //useEffect(()=>connectRoom(),[user.login])
    useEffect(()=>handleJoinToggle(),[loginType])
    useEffect(()=>setError("pass"),[loginType])
    useEffect(() => {
            const handleSignToggle = (e:HTMLDivElement) => {
                //const list = e.classList;
                //list.toggle("hidden");
                if(e.classList.contains("signin")){
                    console.log("login type - join")
                    setLoginType("join")
                }else if(e.classList.contains("signup")){
                    setLoginType("create")
                    console.log("login type - create")
                }

            };



            const signInElement = signInRef.current;
            const signUpElement = signUpRef.current;
            if (signInElement && signUpElement) {
                signInElement.addEventListener('click',()=> handleSignToggle(signInElement));
                signUpElement.addEventListener('click',()=> handleSignToggle(signUpElement));
                signInElement.addEventListener('mouseover',()=> handleSignToggle(signInElement));
                signUpElement.addEventListener('mouseover',()=> handleSignToggle(signUpElement));
            }

            return () => {
                if (signInElement && signUpElement) {
                    signInElement.removeEventListener('click',()=>  handleSignToggle(signInElement));
                    signUpElement.removeEventListener('click',()=>  handleSignToggle(signUpElement));
                    signInElement.removeEventListener('mouseover',()=>  handleSignToggle(signInElement));
                    signUpElement.removeEventListener('mouseover',()=>  handleSignToggle(signUpElement));
                }
            };
        }, []);

    const signInRef = useRef<HTMLDivElement>(null);
    const signUpRef = useRef<HTMLDivElement>(null);



    const handleInputUpdate=(e: ChangeEvent<HTMLSelectElement>)=>{
    console.log("input target",e.target.name=="username",e.target.value)
    console.log("state value",value)
        setValue({...value,[e.target.name]:e.target.value})

    }

    const handleButtonClick=async(e: ChangeEvent<HTMLSelectElement>)=>{
    console.log("bloody type",loginType)
    console.log("bloody value",value)
            if(loginType=="join"){
                setValue({...value,join:true})
            }else if(loginType=="create"){
                setValue({...value,join:false})
            }
            if(validateInput()){
            const userRes = await postUserApi(value)
            console.log("userRes",JSON.parse(userRes.body))
            if(userRes.status!="200"){
                setError(userRes.message)
            }else{
            localStorage.setItem("loginCred", userRes.body);
            console.log("userRes.body",userRes.body)
            var userObj = JSON.parse(userRes.body)
            userObj["login"] = true
            console.log("dispatch",userObj)
            dispatch(addUser(userObj))
            subscribeUser(JSON.parse(userRes.body).Id)
            dispatch(updateSta("selection"))
            }

            }
    }

    const validateInput=()=>{
        if(value.username==""||value.password==""){
            setError("missing credential")
            return false;
        }else if(containsNumber(value.username)){
            setError("username shouldn't have numbers")
            return false;
        }else if(!validateEmail(value.email)&&loginType=="create"){
            setError("mail id provided is invalid")
            return false;
         }else if(!containsSpl(value.password) && !containsNumber(value.password)){
            setError("password should contain atleat a number and special charater")
            return false;
        }else{
            return true
        }


    }
    function containsNumber(str:string) {
      // Check if the string contains any digit between 0 and 9
      return /\d/.test(str);
    }
function containsSpl(str:string) {
        let specialChars =/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
      // Check if the string contains any digit between 0 and 9
      return specialChars.test(str)
    }

function validateEmail(email:string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);

}





    return (

        <div className="auth-wrapper">


            <div className="modal signup" ref={signUpRef}>
                {loginType=="join" ? <a className="login-state-toggle">New user?</a> : ""}
                <Spacer height={20}></Spacer>
                <Title titleTag={"h3"} text={"Sign Up!"}></Title>
                <p>Welcome user, please sign up to continue</p>
                <Spacer height={10}></Spacer>
                {error == "pass" ? "" : <p className="error-msg">{error}</p>}
                <Spacer height={10}></Spacer>
                <TextInput updateFunc={handleInputUpdate} inputLabel={""} name="username" placeholder={"Set your username"} value={value.username} ></TextInput>
                <Spacer height={10}></Spacer>
                <TextInput updateFunc={handleInputUpdate} inputLabel={""} name="email" placeholder={"Enter your email"} value={value.email} ></TextInput>
                <Spacer height={10}></Spacer>
                <TextInput updateFunc={handleInputUpdate} inputLabel={""} name="password" placeholder={"Set your password"} value={value.password} ></TextInput>
                <Spacer height={25}></Spacer>
                <Button onClick={handleButtonClick} name="signup" label={"Submit"}></Button>
                <Spacer height={15}></Spacer>

            </div>
            <div className="modal signin" ref={signInRef}>

                <Spacer height={20}></Spacer>
                <Title titleTag={"h3"} text={"Sign In!"}></Title>
                <p>Welcome back user, please sign in to continue</p>
                <Spacer height={10}></Spacer>
                {error == "pass" ? "" : <p className="error-msg">{error}</p>}
                <Spacer height={10}></Spacer>
                <TextInput updateFunc={handleInputUpdate} name="username" inputLabel={""} placeholder={"Enter your username/email"} value={value.username} ></TextInput>
                <Spacer height={20}></Spacer>
                <TextInput updateFunc={handleInputUpdate} name="password" inputLabel={""} placeholder={"Enter your password"} value={value.password} ></TextInput>
                <Spacer height={40}></Spacer>
                <Button onClick={handleButtonClick} name="signin" label={"Submit"}></Button>
                <Spacer height={40}></Spacer>
                {loginType=="create" ? <a className="login-state-toggle">Already have an account?</a> : ""}
            </div>


        </div>
    )
}

export default Join