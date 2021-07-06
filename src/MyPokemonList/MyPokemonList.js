import React from "react";
import {AppContext} from "../App";
import {useCookies} from "react-cookie";
import './MyPokemonList.css';


export const MyPokemonList = () => {
    const [cookies,setCookie] = useCookies(['name',"mypokemon"]);
  
    const {state} = React.useContext(AppContext);
    // const {state,dispatch} = React.useContext(AppContext);
    console.log(state)
    const onDeleteClick = (ev) => {
        console.log(ev.target.getAttribute('data-name'))
        console.log(cookies.mypokemon)
        // console.log(cookies.mypokemon)
        var del = cookies.mypokemon.filter(a=>a.name!==ev.target.getAttribute('data-name'))
        setCookie("mypokemon",JSON.stringify(del),{path:"/"})
        // dispatch({type:"set",hash: del})
        ev.target.parentNode.remove();
    }
    React.useEffect(()=>{

    },[state.session])
    return(
        <div className="my-pokemon">
        <h1>My Pokemon</h1>
        <div className="all-my-collection">

        {state.session ? state.session.map(({name,image,species,types},idx) => {
            return (
                <div className="pokemon-collection" key={"div"+idx}>
                    <div className="img-container">
                        <img src={image} alt={"test"}/>
                        <p key={"name"+idx}>{name}</p>
                    </div>
                    <div>
                        <p key={idx}>Species: {species}</p>
                        <p key={"species"+idx}>Types: {types}</p>
                    </div>
                <button key={idx+name} data-name={name} onClick={onDeleteClick} > Release</button>
                </div>
            );
        }) : null}
        </div>
        
        </div>
    )
}