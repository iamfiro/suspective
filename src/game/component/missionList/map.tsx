import style from './map.module.scss';
import mapboxgl from 'mapbox-gl';
import {useEffect} from "react";

const Map = () => {
	useEffect(() => {
		mapboxgl.accessToken = 'pk.eyJ1IjoiYW5vamRzIiwiYSI6ImNrbHE1aThnNTA2dTgyem5hYWcwb2d2cjEifQ.HMg1E77jN89BQNfI6Aa2zg';
		new mapboxgl.Map({
			container: 'map', // container ID
			style: 'mapbox://styles/anojds/cm4207pmj00hl01slav8vd3tj', // style URL
			center: [-74.5, 40], // starting position [lng, lat]
			zoom: 9, // starting zoom
		});
	}, []);
	return (
		<div className={style.container}>
			<span className={style.title}>범죄 빅데이터</span>
			<div className={`${style.map}`} id={'map'} />
		</div>
	)
}

export default Map;