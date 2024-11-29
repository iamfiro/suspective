import style from './messengerDummy.module.scss';
import {useEffect, useRef} from "react";
import {gsap} from "gsap";

export interface MessengerProps {
	profileImage: string;
	name: string;
	message: string;
}

const Messenger = ({profileImage, name, message}: MessengerProps) => {
	const containerRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const container = containerRef.current;

		if (container) {
			// 초기 애니메이션 설정
			gsap.set(container, {
				opacity: 0,
				y: 20
			});

			// 등장 애니메이션
			gsap.to(container, {
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: 'power2.out'
			});
		}
	}, []);

	return (
		<article className={style.messenger}>
			<img src={profileImage} alt={`${name}의 프로필`} className={style.profilePicture}/>
			<div className={style.dataContainer}>
				<span className={style.name}>{name}</span>
				<span className={style.message}>{message}</span>
			</div>
		</article>
	);
};


const MessengerDummy = () => {
	return (
		<section className={style.container}>
			<span className={style.title}>사내 메신저</span>
			<div className={style.messengerList}>
				<Messenger
					profileImage="/images/messenger/woman_1.jpg"
					name="Scarlett"
					message="오늘 중으로 실적 보고서 제출하세요"
				/>
				<Messenger
					profileImage="/images/messenger/man_1.jpg"
					name="Aiden"
					message="오늘 밤에 소주에 낙곱새 긔?"
				/>
				<Messenger
					profileImage="/images/messenger/woman_2.jpg"
					name="Isabella"
					message="어려운거 있으면 나한테 다 말해요"
				/>
				<Messenger
					profileImage="/images/messenger/woman_3.jpg"
					name="Emily"
					message="다음 주에 미팅 있습니다"
				/>
				<Messenger
					profileImage="/images/messenger/man_2.jpg"
					name="Daniel"
					message="오늘 저녁에 저랑 같이 운동하실래요?"
				/>
				<Messenger
					profileImage="/images/messenger/woman_4.jpg"
					name="Lily"
					message="[링크] 왕가탕후루 세트 295g 3개"
				/>
			</div>
		</section>
	)
}

export default MessengerDummy;