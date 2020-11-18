import "./App.scss";
import Background from "./components/Background/Background";
import Card from './components/Upload/card';

function App() {
  return (
    <div class="area">
      <div className="App">
        <Background />
        <header className="App-header">SeeFood</header>
        <div className="card">
        <Card />
        </div>
      </div>
    </div>
  );
}

export default App;
