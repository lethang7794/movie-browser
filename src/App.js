import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import MainNavBar from './components/MainNavBar';
import HomePage from './components/pages/HomePage';
import MovieListPage from './components/pages/MovieListPage';

function App() {
  return (
    <div className='App'>
      <MainNavBar />
      <Container>
        <Switch>
          <Route exact path='/now-playing'>
            <MovieListPage />
          </Route>
          <Route exact path='/top-rated'>
            <MovieListPage type={'top_rated'} />
          </Route>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route>
            <h1>Not Found</h1>
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
