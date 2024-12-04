import {useEffect, useRef, useState} from 'react';
import Logo from '../../../../public/images/logo.svg';
import style from '../../../styles/scene/introScene.module.scss';
import {useScene} from "../../../engine/scene/sceneManager.tsx";
import {gsap} from "gsap";

const IntroScene: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const {navigate} = useScene();
	const navigateAnimationRef = useRef<HTMLDivElement>(null);
	const [isAnimated, setIsAnimated] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const handleClick = async () => {
			if (videoRef.current && !isPlaying) {
				try {
					videoRef.current.volume = 1.0; // 볼륨을 1로 설정 (최대)
					await videoRef.current.play();
					setIsPlaying(true);
				} catch (error) {
					console.error('비디오 재생 중 오류 발생:', error);
				}
			}
		};

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [isPlaying]);

	// 화면 이동 및 전체 화면
	const handleStart = () => {
		setIsAnimated(true);

		if (document) {
			document.documentElement.requestFullscreen().catch(err => {
				console.log('Error attempting to enable fullscreen:', err);
			});
		}

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
			<video
				id="mainVideo"
				ref={videoRef}
				loop
				className={style.video}
				playsInline
			>
				<source src={'/videos/crime_file.mp4'} type={'video/mp4'}/>
			</video>
			<span className={style.startButton} onClick={handleStart}>시작하기</span>
			{isAnimated && <div className={style.navigateAnimation} ref={navigateAnimationRef}></div>}
		</>
	);
};

export default IntroScene;