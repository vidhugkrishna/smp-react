import { FC } from "react";

interface ButtonComponentProps {
    Button: string;
  }


const Button:FC<ButtonComponentProps> = (props)=>{


    return  (
        <div className="button-wrapper">
            <button type="submit">{props.Button}</button>
        </div>
    )
}

export default Button;