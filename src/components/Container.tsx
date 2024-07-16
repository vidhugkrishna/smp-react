import { FC } from "react";

interface ContainerComponentProps {
    width:number;
    color?:string;
    justifyContent?:string;
    children:React.ReactNode;

}


const Container:FC<ContainerComponentProps> = ({width,color,justifyContent,children})=>{
    const containerStyle: React.CSSProperties = {
        display:'flex',
        width:width+"%",
        backgroundColor: color || 'transparent',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        justifyContent
      };

    return  (
        <div className="container-wrapper" style={containerStyle}>
            {children}
        </div>
    )
}

export default Container;