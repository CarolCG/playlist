import React, {useState, useEffect, useRef} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [playList, setplayList] = useState([])
	const [valorIcono, setvalorIcono] = useState("fa fa-play")
	let [musicaRepetida, setmusicaRepetida] = useState(false);
	let [positionMusica, setpositionMusica] = useState(0)
	// let [musicaAleatoria, setmusicaAleatoria] = useState()
	let cancionUrl = useRef()

	// const musicaDesordenada = ()=> {
	// 	setmusicaAleatoria(Math.random()*musicaAleatoria)
	// }

	const repetirMusica = () => {
		setmusicaRepetida(!musicaRepetida);
	  } 

	const subirVolumen = () => {
		cancionUrl.current.volume += 0.10;
	  }
	  const bajarVolumen = () => {
		cancionUrl.current.volume -= 0.10;
	  }
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
		.then((response) => {return response.json()
		})
		.then((data) => {
			console.log(data);
			return setplayList(data) 
		})
	}, [])

	function seleccionarMusica(url,index){
		if(cancionUrl.current.paused) {
cancionUrl.current.src=`https://assets.breatheco.de/apis/sound/${url}`;
cancionUrl.current.play();
setvalorIcono("fa fa-pause")
		}else{
			cancionUrl.current.pause()
			setvalorIcono("fa fa-play")
		}
		setpositionMusica(index)
	}

	function cambiarIcono(){
if(cancionUrl.current.paused){
	cancionUrl.current.play()
	setvalorIcono("fa fa-pause")
}else{
	cancionUrl.current.pause()
	setvalorIcono("fa fa-play")
}
	}

	function CancionParaAdelante(){
	setpositionMusica(positionMusica++)
cancionUrl.current.src=`https://assets.breatheco.de/apis/sound/${playList[positionMusica].url}`;
cancionUrl.current.play();
	}

	function CancionParaAtras(){
		setpositionMusica(positionMusica--)
cancionUrl.current.src=`https://assets.breatheco.de/apis/sound/${playList[positionMusica].url}`;
cancionUrl.current.play();

	}
	return (
		<div className="container text-center ">
		<ul className="list-group list-group-flush mb-4">
		{playList.map((song,index) => <button className="btn btn-dark text-start rounded-0" onClick={() => seleccionarMusica(song.url,index)} type="button" key={index}>{index} {song.name} -</button>)}
		</ul>
		<div className="d-flex justify-content-center bg-black fixed-bottom ">
		<audio id="reproductor" ref={cancionUrl} loop={musicaRepetida}>
		</audio>
		<button className="m-2 rounded-4" onClick={bajarVolumen}><i className="fas fa-volume-down mx"></i></button>
		<button className="m-2 rounded-4" onClick={CancionParaAtras}>
		<i className="fa fa-backward mx " style={{width: "50%", height:"25%"}}></i>
		</button>
		<button  className="m-2 rounded-4" onClick={cambiarIcono}>
		<i className={valorIcono} style={{width: "50%", height:"25%"}} ></i>
		</button>
		<button className="m-2 rounded-4" onClick={CancionParaAdelante}>
        <i className="fa fa-forward mx" style={{width: "50%", height:"25%"}}></i>
		</button>
		<button className="m-2 rounded-4" onClick={subirVolumen}><i className="fas fa-volume-up mx"></i></button>
		<button className="m-2 rounded-4" onClick={repetirMusica}> 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
        <path stroke={musicaRepetida ? 'red' : 'black'} stroke-width="1.5" d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
        </svg>
        </button>
		{/* <button className="m-2 rounded-4" onClick={musicaDesordenada}>
		</button> */}
		</div>
		</div>
	);
};

export default Home;
