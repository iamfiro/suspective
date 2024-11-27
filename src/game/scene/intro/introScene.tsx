import {useEffect, useRef, useState} from 'react';
import Logo from '../../../../public/images/logo.svg';
import style from '../../../styles/scene/introScene.module.scss';
import SoundManager from "../../../engine/sound/soundManager.ts";
import {useScene} from "../../../engine/scene/sceneManager.tsx";
import {gsap} from "gsap";

const IntroScene: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const {navigate} = useScene();
	const soundManager = SoundManager.getInstance();
	const navigateAnimationRef = useRef<HTMLDivElement>(null);
	const [isAnimated, setIsAnimated] = useState(false);

	useEffect(() => {
		// Load and play background music
		soundManager.loadSound('bgm', '/sounds/crime_file.mp3');
		soundManager.playBGM('bgm', true);
		soundManager.setMusicVolume(0.2);

		// Cleanup on component unmount
		return () => {
			soundManager.stopBGM();
		};
	}, []);

	// 화면 이동 및 전체 화면
	const handleStart = () => {
		setIsAnimated(true);

		if(document) {
			document.documentElement.requestFullscreen();
		}

		// BGM fade out으로 전환
		soundManager.fadeStop(2000);

		setTimeout(() => {
			gsap.to(navigateAnimationRef.current, {
				duration: 3,
				opacity: 1,
				onComplete: () => {
					navigate('/disclaimer');
				}
			})
		}, 100)
	}

	return (
		<>
			<img src={Logo} className={style.logo} alt={'logo'}/>
			<video ref={videoRef} autoPlay loop muted className={style.video}>
				<source src={'/videos/crime_file.mp4'} type={'video/mp4'}/>
			</video>
			<span className={style.startButton} onClick={() => handleStart()}>시작하기</span>
			{isAnimated && <div className={style.navigateAnimation} ref={navigateAnimationRef}></div>}
		</>
	);
};

export default IntroScene;