import style from './map.module.scss';
import mapboxgl from 'mapbox-gl';
import {useEffect, useRef} from "react";
import {gsap} from "gsap";

const Map = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLSpanElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // GSAP 애니메이션
        if (containerRef.current && titleRef.current && mapRef.current) {
            gsap.set([titleRef.current, mapRef.current], {
                opacity: 0,
                y: 20
            });

            gsap.to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out'
            });

            gsap.to(mapRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 0.2,
                ease: 'power2.out'
            });
        }

        // 1초 후에 맵 로딩
        const timer = setTimeout(() => {
            mapboxgl.accessToken = 'pk.eyJ1IjoiYW5vamRzIiwiYSI6ImNrbHE1aThnNTA2dTgyem5hYWcwb2d2cjEifQ.HMg1E77jN89BQNfI6Aa2zg';
            new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/anojds/cm4207pmj00hl01slav8vd3tj',
                center: [-74.5, 40],
                zoom: 9,
            });
        }, 1000);

        // 클린업
        return () => clearTimeout(timer);
    }, []);

    return (
        <div ref={containerRef} className={style.container}>
            <span ref={titleRef} className={style.title}>범죄 빅데이터</span>
            <div ref={mapRef} className={`${style.map}`} id={'map'} />
        </div>
    )
}

export default Map;