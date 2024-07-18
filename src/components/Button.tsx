import { FC } from "react";

interface ButtonComponentProps {
    label: string;
    onClick:React.Dispatch<React.SetStateAction<any>>;
  }


const Button:FC<ButtonComponentProps> = (props)=>{


    return  (
        <div className="button-wrapper">
            <button onClick={props.onClick} type="submit" >{props.label}</button>
        </div>
    )
}

export default Button;