import React from "react";
// import logo from './logo.svg';
import './Shared/Shared.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {createBrowserHistory} from "history";
import {PokemonList} from "./PokemonList";
import {MyPokemonList} from "./MyPokemonList";
import { PokemonDetail,GetPokemonDetail } from "./PokemonDetail";
import {useCookies} from "react-cookie";
import styled from "@emotion/styled";


export const AppContext = React.createContext({});

const history = createBrowserHistory();
const PokeBall = styled.div(props=> ({
  width: "14vw",
  margin: props.mobile ? "0 12vw" : "0",
    height: "10.7vh",
    background: `url(/images/pokeball.png) 50% 50%/auto 7.7vh no-repeat`
    // background: `${!props.mobile ? "url(/images/pokeball-pink.png)" : "url(/images/pokeball.png)"} 50% 50%/auto 7.7vh no-repeat`
}))
const AshBag = styled.div(props=> ({
  width: "14vw",
  margin: props.mobile ? "0 12vw" : "0",
  height: "10.7vh",
    background: `url(/images/bag.png) 50% 50%/ auto 7.7vh no-repeat`
    // background: `${!props.mobile ? "url(/images/bag-pink.png)" : "url(/images/bag.png)"} 50% 50%/ auto 7.7vh no-repeat`
}))
// const HeaderStyle = styled.div(props=> ({
//   background: !props.mobile ? "#CE1F6A":"transparent" 
// }))


function App() {
  const [orientation,setOrientation] = React.useState(true)
  const [cookies,setCookie] = useCookies(['name',"mypokemon"]);
  // console.log("der")
  React.useEffect(()=>{
    console.log(window.innerHeight)
    console.log(window.innerWidth)
    if(window.innerWidth > window.innerHeight)
    setOrientation(false)
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
              <li><Link to="/">
                {/* <img src="/images/pokeball.png" alt="pokeball"/> */}
                <PokeBall className="pokeball" mobile={orientation}></PokeBall>
                </Link>
              </li>
              {orientation ? <hr/> : null}
              <li>
                <Link to="/my-pokemon">
                  {/* <img src="/images/bag.png" alt="bag"/> */}
                <AshBag className="bag" mobile={orientation}></AshBag>
                  </Link></li>
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
