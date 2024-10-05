import { FC } from "react";

interface ButtonComponentProps {
    label: string;
    onClick:React.Dispatch<React.SetStateAction<any>>;
    name?:string;
    classNames?:string;
  }


const Button:FC<ButtonComponentProps> = (props)=>{


    return  (
        <div className="button-wrapper">
            <button onClick={props.onClick} className={props.classNames} name={props.name} type="submit" >{props.label}</button>
        </div>
    )
}

export default Button;