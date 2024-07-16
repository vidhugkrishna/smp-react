import { FC } from "react";

interface TitleComponentProps {
    titleTag: string; // Accepts HTML tags like 'h1', 'h2', etc.
    text: string; // The text content of the title
  }


const Title:FC<TitleComponentProps> = (props)=>{

    const Tag = props.titleTag.toLowerCase() as keyof JSX.IntrinsicElements;


    return  <Tag>{props.text}</Tag>
}

export default Title;