import { FC ,useRef} from "react";

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

interface ContainerComponentProps {
    width?:number;
    height?:number;
    padding?:number;
    color?:string;
    justifyContent?:string;
    alignItems?:string;
    flexDirection?:FlexDirection;
    children:React.ReactNode;
    classNames?:string;

}


const Container:FC<ContainerComponentProps> = ({width,height,padding,color,justifyContent,alignItems,flexDirection,classNames,children})=>{
    const containerStyle: React.CSSProperties = {
        display:'flex',
        width:width+"%",
        height:height+"%",
        backgroundColor: color || 'transparent',
        padding: padding+"px",
        borderRadius: '5px',
        justifyContent,
        alignItems,
        flexDirection
      };

    return  (
        <div className={classNames} style={containerStyle}>
            {children}
        </div>
    )
}

export default Container;