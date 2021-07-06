import React from "react";
import {Link} from "react-router-dom";
import {AppContext} from "../App";
import './PokemonDetail.css';
// import {useCookies} from "react-cookie";
// import styled from '@emotion/styled'
import { gql, useQuery } from '@apollo/client';
const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name){
        id
        name
        moves {
          move {
            name
          }
        }
        species{
            url
            name
        }
        types {
            slot
          type {
              url
            name
          }
        }
        sprites{
            front_default
          }
        message
        status
      }
  }
`;

export const GetPokemonDetail = (prop) => {
    const {match} = prop;
    let overlay = React.useRef(null);
    let popup = React.useRef(null);
    let pokemonname = React.useRef(null);
    let failedPopup = React.useRef(null);
    // const [apolloPokemon,setApolloPokemon] = React.useState([])
    // console.log(match.params.type)
    let gqlVariables = {
        name: match.params.type
    }
    const {error,data} = useQuery(GET_POKEMON,{
        variables: gqlVariables
    })
    if (error) console.log( `Error! ${error.message}`);
    
    React.useEffect(()=>{
        // console.log(data?.pokemon || [])
        // setApolloPokemon(data?.pokemon || [])
        // console.log(apolloPokemon)
        // console.log(data?.pokemon?.sprites?.front_default || [])
        if(data?.pokemon || false){
            if(window.innerWidth < window.innerHeight)
            document.querySelector(".details").style.height= "36vh";
            else
            document.querySelector(".details").style.width= document.documentElement.style.setProperty('--details-width', 32 + "vw");
            setPokemonSpecies(data?.pokemon?.species?.name || "");
            setPokemonImage(data?.pokemon?.sprites?.front_default || "")
            setPokemonMoves(data?.pokemon?.moves || [])
            setPokemonTypes(data?.pokemon?.types || [])
        }
    },[data])
    // const [cookies] = useCookies(['name',"mypokemon"]);
  
    const {dispatch,cookies} = React.useContext(AppContext)
    // const [pokemonDetail,setPokemonDetail] = React.useState(null)
    const [pokemonMoves,setPokemonMoves] = React.useState(null)
    const [pokemonTypes,setPokemonTypes] = React.useState(null)
    const [pokemonImage,setPokemonImage] = React.useState(null)
    const [pokemonSpecies,setPokemonSpecies] = React.useState(null)
    // const [randomNumber, setRandomNumber] = React.useState(false)
    const gotchaClick = (ev) =>{
        ev.preventDefault();
        // console.log(cookies?.mypokemon?.filter(a=>a.name===pokemonname.value) || [])
        if(((cookies?.mypokemon?.filter( a=>a.species===pokemonSpecies).length || []) > 0 && 
        (cookies?.mypokemon?.filter( a=>a.name===pokemonname.value).length || []) > 0) || pokemonname.value===""){
            if( pokemonname.value===""){
                alert("Name cannot be empty")
                return;
            }
            
            alert("Please use another name")
        }
        else if(pokemonname.value.length > 10 || false){
            alert("Name length must be less than 10 character")
        }
        else{
            overlay.style.background = "rgba(0,0,0,0)";
            overlay.style.visibility= "hidden";
            popup.style.visibility= "hidden";
            // console.log(pokemonTypes.map((item)=>item.type.name))
            dispatch({type: "myPokemon", types: pokemonTypes.map((item)=>item.type.name).toString(),species:pokemonSpecies, image:pokemonImage, hash: pokemonname.value});
        }
        // console.log(cookies.mypokemon.name.indexOf(pokemonname.value))
    }
    const failedClick = (ev) =>{
        ev.preventDefault();
        // console.log(cookies.mypokemon.filter(a=>a.name===pokemonname.value))
        overlay.style.background = "rgba(0,0,0,0)";
        overlay.style.visibility= "hidden";
        failedPopup.style.visibility= "hidden";
        // console.log(cookies.mypokemon.name.indexOf(pokemonname.value))
    }
    const catchItClick = () =>{
        console.log("catchit click");
        /** 50% chance to get the item */
        const rand = Math.random() < 0.5
        console.log(rand)
        // setRandomNumber(Math.random() < 0.5)
        if(rand){
            /**get the pokemon */
            // console.log("how many")
            popup.style.visibility = "visible";
            overlay.style.visibility= "visible";
            overlay.style.background = "rgba(0,0,0,0.7)";
            // dispatch({type: "myPokemon", image:pokemonImage, hash: prompt("Congratulation, You catch the Pokemon!", "What do you want to name it?")});
            // dispatch({type: "myPokemon", hash: "What do you want to name it?"});
        }
        else{
            /** didn't get the pokemon */
            failedPopup.style.visibility = "visible";
            overlay.style.visibility= "visible";
            overlay.style.background = "rgba(0,0,0,0.7)";
        }
    }
    // React.useEffect(()=>{
    //     if(randomNumber){
    //         /**get the pokemon */
    //         console.log("how many")
    //         dispatch({type: "myPokemon", hash: prompt("Congratulation, You catch the Pokemon!", "What do you want to name it?")});
    //         // dispatch({type: "myPokemon", hash: "What do you want to name it?"});
    //     }
    //     else{
    //         /** didn't get the pokemon */
    //     }
    // },[randomNumber])
    let containerItem = React.useRef(null);
    // const [value, setValue] = React.useState("");
    // const Element = ({animate}) =>{
        
    // }

    // React.useEffect(()=>{
    //     console.log(match)
    //     if(match)
    //     fetch("https://pokeapi.co/api/v2/pokemon/"+match.params.type)
    //     .then(res=>res.json())
    //     .then(data=>{
    //         setPokemonDetail(data)
    //         if(window.innerWidth < window.innerHeight)
    //         document.querySelector(".details").style.height= "36vh";
    //         else
    //         document.querySelector(".details").style.width= document.documentElement.style.setProperty('--details-width', 32 + "vw");
    //     });
    // },[match])
    // React.useEffect(()=>{
    //     console.log(pokemonDetail)
    //     if(pokemonDetail){
    //         setPokemonSpecies(pokemonDetail.species.name);
    //         setPokemonImage(pokemonDetail.sprites.other['official-artwork'].front_default)
    //         setPokemonMoves(pokemonDetail.moves)
    //         setPokemonTypes(pokemonDetail.types)
    //     }
    //     // containerItem.style.height= "36vh";
    //     // document.querySelector(".details").style.height= "36vh";
    // },[pokemonDetail])

    // console.log(containerItem)
        // console.log(animate);
        React.useEffect(()=>{
            // console.log("render")
            if(document.querySelector(".details")){
                // animate = "false";
                // containerItem.setAttribute("animated","true")
                if(window.innerWidth < window.innerHeight)
                containerItem.style.height= "36vh";
                else
                containerItem.style.width= document.documentElement.style.setProperty('--details-width', 32 + "vw");
            }
            // setValue({height: "26vh"})
        },[])
    return (
        <>
        {match ? <div className="details-container">
            
            <Link to="/pokedex"><img className="back-btn" src="/images/left-arrow.png" alt="close-btn"/></Link>
            
        <h1>{match ? match.params.type : null}</h1>
            <img className="detail-img" src={pokemonImage} alt={match.params.type+".png"}/>
            <div className="overlay" ref={el => overlay = el}>
                <div className="popup" ref={el => popup = el}>
                    <form onSubmit={gotchaClick}>
                        <h2>Gotcha!</h2>
                        <input ref={el => pokemonname = el} placeholder="Please enter a name!"/>
                        <input type="submit"/>
                    </form>
                </div>
                <div className="failedpopup" ref={el => failedPopup = el}>
                    <form onSubmit={failedClick}>
                        <h2>PokeBall Failed</h2>
                        <input type="submit" value="dismiss"/>
                    </form>
                </div>
            </div>
        <div className="details" ref={el => {containerItem = el}}>
            {/* <div className="color-block"></div> */}
            {/* <h2></h2> */}
            <div className="catch-container" >
                <button onClick={catchItClick}><h3>Catch it!</h3></button>
            </div>
            <h3>Types</h3>
            {pokemonTypes ? pokemonTypes.map((item,idx)=>{
                return (
                    <p key={idx}>{item.type.name}</p>
                );
            }) : null}
            <h3>Moves</h3>
            {pokemonMoves ? pokemonMoves.map((item,idx)=>{
                return (
                    <p key={idx}>{item.move.name}</p>
                );
            }) : null}

        </div>
        </div> : null}
        </>
    )
}
export const PokemonDetail = () => {
    return(
        <>
        {/* <h1>Pokemon Detail</h1>
        <GetPokemonDetail/> */}
        </>
    )
};
