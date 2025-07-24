import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Homepage from "./pages/Homepage";
import './App.css'; // ✅ REQUIRED
import Chatpage from "./pages/Chatpage";


function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/" component={Chatpage} />
    </div>
  );
}

export default App;
