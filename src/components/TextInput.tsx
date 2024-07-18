import { ChangeEvent, FC, useState } from "react";

interface TextInputComponentProps {
    inputLabel: string;
    placeholder: string; 
    value: string;
    updateFunc:React.Dispatch<React.SetStateAction<any>>;
  }


const TextInput:FC<TextInputComponentProps> = (props)=>{


    return  (
        <div className="input-name-wrapper">
            <label htmlFor="input-item">{props.inputLabel}</label>
            <input onChange={props.updateFunc} type="text" id="input-item" className="name-input" value={props.value} placeholder={props.placeholder}/>
        </div>
    )
}

export default TextInput;