import React, {useState, useEffect, useRef} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [playList, setplayList] = useState([])
	const [valorIcono, setvalorIcono] = useState("fa fa-play")
	let [positionMusica, setpositionMusica] = useState(0)
	let cancionUrl = useRef()

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
		<audio id="reproductor" ref={cancionUrl}>
		</audio>
		<button className="m-2 rounded-4" onClick={bajarVolumen}><i class="fas fa-volume-down mx"></i></button>
		<button className="m-2 rounded-4" onClick={CancionParaAtras}>
		<i className="fa fa-backward mx " style={{width: "50%", height:"25%"}}></i>
		</button>
		<button  className="m-2 rounded-4" onClick={cambiarIcono}>
		<i className={valorIcono} style={{width: "50%", height:"25%"}} ></i>
		</button>
		<button className="m-2 rounded-4" onClick={CancionParaAdelante}>
        <i className="fa fa-forward mx" style={{width: "50%", height:"25%"}}></i>
		</button>
		<button className="m-2 rounded-4" onClick={subirVolumen}><i class="fas fa-volume-up mx"></i></button>
		</div>
		</div>
	);
};

export default Home;
