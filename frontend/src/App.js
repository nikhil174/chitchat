import './App.css';
import { Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Chatpage from './pages/Chatpage';

function App() {
  return (
    <div className="App">
      <Route path="/" exact>
        <Homepage />
      </Route>
      <Route path="/chats">
        <Chatpage />
      </Route>
    </div>
  );
}

export default App;
