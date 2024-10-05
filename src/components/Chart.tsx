import { FC,useEffect,useState } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { useDispatch,useSelector } from "react-redux"
import { RootState,AppDispatch } from "../redux/store"


interface dataInterface {
            id:number;
            value:number;
            label:string;
        }
const initialChartData:[dataInterface] =   [{
            id:0,
            value:0,
            label:""
        }]

const Chart:FC = ()=>{

const [chartData, setChartData] = useState<dataInterface[]>(initialChartData);
const storyState = useSelector((state:RootState)=> state.story)
const voteList = storyState.votes
const allVoteList  = voteList.map(item=> item.slice(item.indexOf("#vote") + 5))
const uniqueVoteList = [...new Set(allVoteList.map(item => item))]

const getDataObjects=(item:string)=>{
    var count=0;
    for (const vote of allVoteList) {
        if(vote==item){
        count++
        }
    }
    return {id:uniqueVoteList.indexOf(item),value:count,label:item}

}

const setDataForChart=()=>{
    console.log("allVoteList",allVoteList)
    console.log("uniqueVoteList",uniqueVoteList)
    const dataListForChart = uniqueVoteList.map(getDataObjects)
    console.log("dataListForChart",dataListForChart)
    setChartData(dataListForChart);

}

useEffect(()=>setDataForChart(),[])
    return  (
        <PieChart
          series={[
            {
              data: chartData,
            },
          ]}
          width={400}
          height={200}
        />
    )
}

export default Chart;