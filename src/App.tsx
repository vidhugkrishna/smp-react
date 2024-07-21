import { useSelector } from 'react-redux';
import './App.css';
import Join from './components/Join';
import Nav from './components/Nav';
import StorySection from './components/StorySection';

import CreateRoom from './pageComponents/CreateRoom';
import RoomSection from './pageComponents/RoomSection';
import { RootState } from './redux/store';

function App() {
  const user = useSelector((state:RootState)=> state.user)
  const appState = useSelector((state:RootState)=> state.appState)

  const renderSwitch=(appState : string)=>{
    switch(appState) {
      case 'createRoom':
        return <CreateRoom/>
      case 'selection':
        return <RoomSection/>
      default:
        return <Join/>;
    }
  }
  return (
    <div className="App">
      <Nav></Nav>
      <div>
        {renderSwitch(appState)}
        
      </div>
    </div>
  );
}

export default App;
