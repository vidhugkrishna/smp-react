import { FC } from "react";

interface TextInputComponentProps {
    inputLabel: string;
    placeholder: string; 
  }


const TextInput:FC<TextInputComponentProps> = (props)=>{


    return  (
        <div className="input-name-wrapper">
            <label htmlFor="input-item">{props.inputLabel}</label>
            <input data-v-13ead005="" type="text" id="input-item" className="name-input" placeholder={props.placeholder}/>
        </div>
    )
}

export default TextInput;