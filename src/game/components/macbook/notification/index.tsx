import style from './style.module.scss';
import MessageIcon from '../../../../../public/images/macbook/program/mail.png';
import {useEffect, useState} from "react";
import {createGlitchText} from "../../../../lib/createGlitchText.ts";

export const Notification = () => {
	const [mails, setMails] = useState('');

	useEffect(() => {
		const glitchElement = createGlitchText({
			text: '71yuchan@sex.com',
			onUpdate: setMails,
			interval: 100,
		});

		return () => glitchElement.stop();
	}, [mails]);

	return (
		<article className={style.container}>
			<img src={MessageIcon} alt="message" className={style.icon}/>
			<div className={style.data}>
				<span className={style.appName}>Mail</span>
				<span className={style.title}>{mails}</span>
				<span className={style.content}>날 찾을 수 있을 것 같아?</span>
			</div>
		</article>
	)
}