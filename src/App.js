import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import MainNavBar from './components/MainNavBar';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import MovieListPage from './pages/MovieListPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className='App'>
      <MainNavBar />

      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route exact path='/now-playing'>
          <MovieListPage />
        </Route>
        <Route exact path='/top-rated'>
          <MovieListPage type={'top_rated'} />
        </Route>
        <Route exact path='/popular'>
          <MovieListPage type={'popular'} />
        </Route>
        <Route exact path='/upcoming'>
          <MovieListPage type={'upcoming'} />
        </Route>
        <Route exact path='/search'>
          <MovieListPage type={'search'} />
        </Route>
        <Route path='/movie/:moviePath'>
          <MovieDetailPage />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
