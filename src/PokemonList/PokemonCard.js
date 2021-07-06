import React from 'react';
import { Link } from "react-router-dom";
import './PokemonCard.css';
import { gql, useQuery } from '@apollo/client';

export const Container = (prop) => {
    const {children} = prop;
    return (
    <div className="card-container">
        {children}
    </div>
    )
}
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
const PokemonCard = (dataset) => {
    const scrollpos = React.useRef(null);
    const [apolloPokemon,setApolloPokemon] = React.useState([])
    const [pokemonDetail, setPokemonDetail] = React.useState([])
    const [pokemonImage,setPokemonImage] = React.useState("");
    // React.useEffect(()=>{
    //     // console.log(dataset.url)
    //     fetch(dataset.url)
    //     .then(res=>res.json())
    //     .then(data=>setPokemonDetail(data));
    //     // console.log(scrollpos.scrollTop)
    // },[])
    let gqlVariables = {
        name: dataset.name
    }
    const {error,data} = useQuery(GET_POKEMON,{
        variables: gqlVariables
    })
    if (error) console.log( `Error! ${error.message}`);
    // console.log(data);
    React.useEffect(()=>{
        // console.log(data?.pokemon || [])
        setApolloPokemon(data?.pokemon?.sprites?.front_default || [])
        // console.log(apolloPokemon)
        // console.log(data?.pokemon?.sprites?.front_default || [])
    },[data])
    React.useEffect(()=>{
        // console.log(dataset.url)
        if(pokemonDetail.length!==0){
            // console.log(pokemonDetail)

            // console.log(pokemonDetail.sprites)
            // console.log(pokemonDetail.sprites.other)
            // console.log(pokemonDetail.sprites.other['official-artwork'])
            // console.log(pokemonDetail.sprites.other['official-artwork'].front_default)
            setPokemonImage(pokemonDetail?.sprites.other['official-artwork'].front_default)
        }
    },[pokemonDetail])
    const onSelectedClick = (ev) =>{
        // console.log("target")
        // console.log(ev.target.parentNode.parentNode.id)
        // console.log(ev.target.parentNode.parentNode.id.split('/'))
        // console.log(ev.target.getBoundingClientRect().y)
        sessionStorage['myScroll'] = ev.target.parentNode.parentNode.id.split('/');
        // sessionStorage['myScroll'] = ev.target.getBoundingClientRect().y;
    }
    if(dataset){
        // console.log(dataset)
        
        return (
                <div className="card-container" id={"card-"+dataset.url.split("/")[6]} ref={scrollpos} onClick={onSelectedClick}>
                    
                    <Link to={"/pokemon/"+dataset.name}><img src={apolloPokemon} alt={apolloPokemon}/><p>{dataset.name}</p></Link>
                    {/* <Route path="/pokemon/:type" component={GetPokemonDetail}/> */}
                </div>
        )
    }
    return {Container}
};

export default PokemonCard;