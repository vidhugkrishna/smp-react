import { FC } from "react";

interface ContainerComponentProps {
    width?:number;
    height?:number;
    padding?:number;
    color?:string;
    justifyContent?:string;
    alignItems?:string;
    children:React.ReactNode;

}


const Container:FC<ContainerComponentProps> = ({width,height,padding,color,justifyContent,alignItems,children})=>{
    const containerStyle: React.CSSProperties = {
        display:'flex',
        width:width+"%",
        height:height+"vh",
        backgroundColor: color || 'transparent',
        padding: padding+"px",
        border: '1px solid #ccc',
        borderRadius: '5px',
        justifyContent,
        alignItems
      };

    return  (
        <div className="container-wrapper" style={containerStyle}>
            {children}
        </div>
    )
}

export default Container;