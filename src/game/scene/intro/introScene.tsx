import { useEffect, useRef } from 'react';
import Logo from '../../../../public/images/logo.svg';
import style from '../../../styles/scene/introScene.module.scss';
import SoundManager from "../../../engine/sound/soundManager.ts";

const IntroScene: React.FC = () => {
	const logoRef = useRef<HTMLImageElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		// Initialize SoundManager
		const soundManager = SoundManager.getInstance();

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
		if(document) {
			document.documentElement.requestFullscreen();
		}
	}

	return (
		<>
			<img ref={logoRef} src={Logo} className={style.logo} alt={'logo'}/>
			<video ref={videoRef} autoPlay loop muted className={style.video}>
				<source src={'/videos/crime_file.mp4'} type={'video/mp4'}/>
			</video>
			<span className={style.startButton} onClick={() => handleStart()}>시작하기</span>
		</>
	);
};

export default IntroScene;