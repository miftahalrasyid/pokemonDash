import React from 'react';
import { Link } from "react-router-dom";
import './PokemonCard.css';

export const Container = (prop) => {
    const {children} = prop;
    return (
    <div className="card-container">
        {children}
    </div>
    )
}
const PokemonCard = (dataset) => {
    const scrollpos = React.useRef(null);
    const [pokemonDetail, setPokemonDetail] = React.useState([])
    const [pokemonImage,setPokemonImage] = React.useState("");
    React.useEffect(()=>{
        // console.log(dataset.url)
        fetch(dataset.url)
        .then(res=>res.json())
        .then(data=>setPokemonDetail(data));
        // console.log(scrollpos.scrollTop)
    },[])
    React.useEffect(()=>{
        // console.log(dataset.url)
        if(pokemonDetail.length!=0){
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
        console.log(ev.target.parentNode.parentNode.id)
        console.log(ev.target.parentNode.parentNode.id.split('/'))
        // console.log(ev.target.getBoundingClientRect().y)
        sessionStorage['myScroll'] = ev.target.parentNode.parentNode.id.split('/');
        // sessionStorage['myScroll'] = ev.target.getBoundingClientRect().y;
    }
    if(dataset){
        // console.log(dataset)
        
        return (
                <div className="card-container" id={"card-"+dataset.url.split("/")[6]} ref={scrollpos} onClick={onSelectedClick}>
                    
                    <Link to={"/pokemon/"+dataset.name}><img src={pokemonImage} alt={pokemonImage}/><p>{dataset.name}</p></Link>
                    {/* <Route path="/pokemon/:type" component={GetPokemonDetail}/> */}
                </div>
        )
    }
    return {Container}
};

export default PokemonCard;