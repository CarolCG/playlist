import React, {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [playList, setplayList] = useState([])

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
		.then((response) => {return response.json()
		})
		.then((data) => {
			console.log(data);
			return setplayList(data) 
		})
	}, [])
	return (
		<div className="container text-center ">
		<ul className="list-group list-group-flush">
		{playList.map((song) => <button className="btn btn-dark text-start rounded-0" type="button" key={song.id}>{song.id} {song.name} -</button>)}
		</ul>
		<div className="d-flex justify-content bg-secondary">
		<i className="fa fa-backward mx-2" style={{width: "50%", height:"25%"}}></i>
		<i className="fa fa-play" style={{width: "50%", height:"25%"}}></i>
		{/* <audio  id="reproductor" controls>	</audio> */}
        <i className="fa fa-forward mx-2" style={{width: "50%", height:"25%"}}></i>
		</div>
		</div>
	);
};

export default Home;
