import React from "react";
import {Container} from "./PokemonCard";
const Test = (data) =>{
    return <h3>test</h3>
}
export const PokemonList = () => {
    const [data,setData] = React.useState([]);
    const [populate,setPopulate] = React.useState([<Test/>]);
    var data2 = []
    const Populate = () =>{
        return(populate)
    }
    React.useEffect(()=>{
        fetch("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20")
        .then(res=>res.json())
        .then(data=>setData(data.results));
    },[])
    React.useEffect(()=>{
        
        for(let i=0; i<3; i++){
            data2 = [...data2,<Test key={i}/>];
        }
        setPopulate(data2);
        // Populate({pokemondata: data2})
        console.log(data)
    },[data])
    console.log(Container)
    return(
        <>
        <h1>Pokemon List</h1>
        <Populate/>
            <Container>
                {/* test */}
            </Container>
        </>
    );
}