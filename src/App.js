import React from "react";
// import logo from './logo.svg';
import './Shared/Shared.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {createBrowserHistory} from "history";
import {PokemonList} from "./PokemonList";
import {MyPokemonList} from "./MyPokemonList";
import { PokemonDetail,GetPokemonDetail } from "./PokemonDetail";
import {useCookies} from "react-cookie";


export const AppContext = React.createContext({});

const history = createBrowserHistory();


function App() {
  const [cookies,setCookie] = useCookies(['name',"mypokemon"]);
  // console.log("der")
  React.useEffect(()=>{

    console.log(cookies.mypokemon)
    if(!cookies.mypokemon){
      // setCookie('mypokemon',[],{path:'/'})
      dispatch({type: "set", hash: []});
    }
    console.log(cookies.mypokemon)
  },[])
  var initialState = {
    session: cookies.mypokemon
  };

  
  const reducer = (state,action) => {
    switch (action.type) {
      case "myPokemon":
        // console.log("mypokemon")
        // const filter = state.session.filter((a)=>a);
        setCookie('mypokemon',JSON.stringify([...state.session,{species: action.species,image: action.image, name: action.hash}]),{path:'/'})
        // console.log(cookies.mypokemon)
        // return {...state,session: action.hash}
        return {...state,session:[...state.session,{species: action.species,image: action.image, name: action.hash}]}
      case "set":
        // console.log(action.hash)
        // setCookie('mypokemon',JSON.stringify(action.hash),{path:'/'})
        return {...state,session:action.hash}
      default:
        return state;
    }
  }
  const [state,dispatch] = React.useReducer(reducer,initialState)
  return (
    <AppContext.Provider value={{state,dispatch,cookies}}>
      <Router history={history}>
        <div className="main-header">
          <nav>
            <ul>
              <li><Link to="/"><img src="/images/pokeball.png" alt="pokeball"/></Link></li>
              
              <li><Link to="/my-pokemon"><img src="/images/bag.png" alt="bag"/></Link></li>
            </ul>
          </nav>
        </div>
        <Route exact path="/" component={PokemonList}></Route>
        <Route path="/my-pokemon" component={MyPokemonList}></Route>
        <Route path="/pokemon" component={PokemonDetail}></Route>
        <Route path="/pokemon/:type" component={GetPokemonDetail}/>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
