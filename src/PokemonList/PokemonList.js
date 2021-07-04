import React from "react";
import PokemonCard,{Container} from "./PokemonCard";
import "./PokemonList.css";
import {Link} from "react-router-dom";
// const Test = (data) =>{
//     return <h3>test</h3>
// }
// window.addEventListener("beforeunload", function(){
//     localStorage.removeItem("myKey");
// });
export const PokemonList = () => {

    const FETCH_LIMIT = 20;
    let data1 = []
    const smartscroll = React.useRef(null);
    const [offset, setOffset] = React.useState(0);
    const [limit, setLimit] = React.useState(FETCH_LIMIT);
    const [dataFetch,setDataFetch] = React.useState(JSON.parse(sessionStorage['myKey'] || '[]'));
    // const [dataFetch,setDataFetch] = React.useState(JSON.parse(localStorage['myKey'] || '[]'));
    // const [dataFetch,setDataFetch] = React.useState( []);
    const [scrollFetch,setScrollFetch] = React.useState(false);
    // const [populate,setPopulate] = React.useState([<Test/>]);
    // var data2 = []
    // const Populate = () =>{
    //     return(populate)
    // }
    React.useEffect(()=>{
        // console.log(document.querySelector(".content").scrollTop)
        console.log(sessionStorage['myScroll'])
        document.querySelector(".content").scrollTop = parseInt(document.querySelector("#"+sessionStorage['myScroll'])?.getBoundingClientRect()?.y || 0);
        console.log(document.querySelector("#"+sessionStorage['myScroll'])?.getBoundingClientRect()?.y || 0 -parseInt(window.innerHeight))
        // console.log(parseInt(document.querySelector(".content").scrollTop)-parseInt(window.innerHeight))
        document.querySelector(".content").scrollTop = parseInt(document.querySelector(".content").scrollTop)-parseInt(window.innerHeight)/4;
        // smartscroll.scrollTop = sessionStorage['myScroll'];
    },[]);
    React.useEffect(()=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
        .then(res=>res.json())
        .then(data=>{
            // console.log(dataFetch)
            // data1 = [...dataFetch,...data.results];
            let data1 = []; 
            // console.log(dataFetch.length < limit)
            // console.log(sessionStorage['myKey'])
            if(limit > dataFetch.length){
                data1 = [...dataFetch,...data.results]
                setDataFetch(data1);
                sessionStorage['myKey'] = JSON.stringify(data1);
            }
            // console.log(JSON.parse(sessionStorage['myKey'] || '[]'))
            // console.log(dataFetch)

            // localStorage.clear();
            // sessionStorage.clear();
            // let distinct = [...new Set(data1.map(a=>a.name))];
            // sessionStorage['myKey'] = JSON.stringify(distinct);
        // console.log(JSON.parse(localStorage['myKey']))

            // console.log(data1)
            // setDataFetch([...dataFetch, data.results]);
            setScrollFetch(true);
        });
    },[limit])
    // },[scrollFetch])
  
    // React.useEffect(()=>{
    //     // var card = <PokemonCard dataset={data.name}/>
    //     for(let i=0; i<dataFetch.length; i++){
    //         data2 = [...data2,<PokemonCard {...dataFetch[i]}/>];
    //         // data2 = [...data2,<PokemonCard dataset={data.name}/>];
    //     }
    //     setPopulate(data2);
    //     // Populate({pokemondata: data2})
    //     console.log(dataFetch)
    // },[dataFetch])
    const onPageScroll = (ev) => {
        // console.log(sessionStorage['myScroll'])
        // console.log(document.querySelector("#"+sessionStorage['myScroll']))
        // console.log(ev)
        /**scroll value */
        // console.log(ev.target.scrollTop)
        // ev.target.scrollTop = parseInt(ev.target.scrollTop)-parseInt(window.innerHeight)
        /**scroll position */
        // sessionStorage['myScroll'] = ev.target.scrollTop ;
        // console.log(sessionStorage['myScroll']) ;
        /** available scroll */
        // console.log(ev.target.scrollHeight-ev.target.offsetHeight)
        // console.log((ev.target.scrollHeight-ev.target.offsetHeight)/2)
        if(ev.target.scrollTop > (ev.target.scrollHeight-ev.target.offsetHeight)/2 && scrollFetch){
            // let 
            // fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50")
            // .then(res=>res.json())
            // .then(data=>setDataFetch(data.results));
            setOffset(offset+FETCH_LIMIT);
            setLimit(limit+FETCH_LIMIT);
            setScrollFetch(false);

        }
    };
    // console.log(Container)
    return(
        <div className="pokedex">
        <h1 className="title">PokeDex</h1>
        {/* <div className="main-header">
          <nav>
            <ul>
              <li><Link to="/"><img src="/images/pokeball.png" alt="pokeball"/></Link></li>
              
              <li><Link to="/my-pokemon">My Pokemon</Link></li>
            </ul>
          </nav>
        </div> */}
        <section className="content" ref={smartscroll} onScroll={onPageScroll}>
            {dataFetch.map((item,idx)=>{
                return(
                    <React.Fragment key={idx}>
                        <PokemonCard {...item} />
                        {/* <hr/> */}
                    </React.Fragment>
                )
            })}
        </section>
        {/* <Populate/> */}
        
        {/* <PokemonCard dataset={{name: "miftah", type:"water"}}/> */}
            {/* <Container> */}
                {/* test */}
            {/* </Container> */}
        </div>
    );
}