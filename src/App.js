import './App.css';
import { Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import SearchAnimes from './components/SearchAnimes';
import FetchAnimes from './components/FetchAnimes';
import FetchCharacter from './components/FetchCharacter';
import TopAnimes from './components/TopAnimes';
import WishList from './components/WishList';
import Downloads from './components/Downloads';

function App() {
  return (

    <Routes>
      <Route path='/' element={<Home/>}>
      </Route>
      <Route path='/searchAnime' element={<SearchAnimes/>}></Route>
      <Route path='/fetchAnimes' element={<FetchAnimes/>}></Route>
      <Route path='/fetchCharacter' element={<FetchCharacter/>}></Route>
      <Route path='/wishList' element={<WishList/>}></Route>
      <Route path='/downloads' element={<Downloads/>}></Route>
    </Routes> 

  )
}

export default App;
