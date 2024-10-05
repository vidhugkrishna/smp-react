import { FC } from "react";

interface TitleComponentProps {
    titleTag: string; // Accepts HTML tags like 'h1', 'h2', etc.
    text: string; // The text content of the title
  }


const Title:FC<TitleComponentProps> = (props)=>{
const titleStyle: React.CSSProperties = {
        margin:'unset',
        padding:'unset'
      };
    const Tag = props.titleTag.toLowerCase() as keyof JSX.IntrinsicElements;


    return  <Tag style={titleStyle}>{props.text}</Tag>
}

export default Title;