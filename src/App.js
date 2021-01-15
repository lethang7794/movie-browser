import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './App.css';
import MainNavBar from './components/MainNavBar';

function App() {
  return (
    <div className='App'>
      <MainNavBar />
      <Container>
        <h1 className='text-center'>Let's go</h1>
      </Container>
    </div>
  );
}

export default App;
