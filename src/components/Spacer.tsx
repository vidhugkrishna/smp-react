import { FC } from "react";

interface SpacerComponentProps {
    height: number;
  }

const Spacer:FC<SpacerComponentProps> = (props)=>{
    const heightPx = props.height+"px"

    return  (<div className="spacer-cmp" style={{height:heightPx}}></div>)
}

export default Spacer;