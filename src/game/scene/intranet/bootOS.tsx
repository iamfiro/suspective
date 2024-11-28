import {memo, useEffect, useMemo, useState} from 'react';
import styles from '../../../styles/scene/intranet/bootOS.module.scss';
import PoliceLogo from '../../../../public/images/us_police_logo.svg';
import {useScene} from "../../../engine/scene/sceneManager.tsx";
import SoundManager from "../../../engine/sound/soundManager.ts";
import style from "../../../styles/scene/welcomeToStation.module.scss";
import ConversationDisplay from "../../component/conversationDisplay.tsx";
import {IConversation} from "../intro/welcomeToStation.tsx";

const IntranetBootOS = () => {
	const [progress, setProgress] = useState(0);
	const {navigate} = useScene();

	const conversation = useMemo(() => [
       {
          character: 'boss',
          text: '네 감으로 골라봐. 개인적으로 흥미로운 사건이든',
          audioPath: '',
          duration: 3,
       },
    ], []);

	useEffect(() => {
		const soundManager = SoundManager.getInstance();
		setTimeout(() => {
			soundManager.loadSound('voice', '/sounds/welcome/jack/a8.mp3');
			soundManager.setMusicVolume(0.5);
			soundManager.playSFX('voice');
		}, 0);

		return () => soundManager.clearSounds();
	}, []);

	useEffect(() => {
		let timer: number;
		if (progress < 100) {
			timer = setTimeout(() => {
				setProgress(prev => Math.min(prev + Math.random() * 10, 100));
			}, 250);
		} else {
			setTimeout(() => {
				navigate('/intranetBootProgram');
			}, 300)
		}
		return () => clearTimeout(timer);
	}, [progress]);

	const MemoizedConversationDisplay = memo(ConversationDisplay);

	return (
		<main className={styles.container}>
			<img className={styles.img} src={PoliceLogo} alt="US Police Logo"
			/>
			<div className={styles.progressBar}>
				<div
					className={styles.progress}
					style={{width: `${progress}%`}}
				/>
			</div>
			<MemoizedConversationDisplay
				conversation={conversation as IConversation[]}
				className={`${styles.subtitle} ${style.text}`}
			/>
		</main>
	);
};

export default IntranetBootOS;