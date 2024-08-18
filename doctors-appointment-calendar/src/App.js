import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from './components/Calender';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  return (
    <div className="App">
        <Calendar />
    </div>
  );
}

export default App;
