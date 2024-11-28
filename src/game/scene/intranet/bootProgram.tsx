import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import style from '../../../styles/scene/intranet/bootProgram.module.scss';
import USPoliceLogo from "../../component/intranet/usPoliceLogo.tsx";
import FolderItem from "../../component/intranet/program.tsx";
import ProgramBootScreen from "../../component/intranet/programBootScreen.tsx";
import SoundManager from "../../../engine/sound/soundManager.ts";

const BootProgram = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const computerRef = useRef<HTMLDivElement>(null);
	const folderRefs = useRef<(HTMLDivElement | null)[]>([]);
	const [currentTime, setCurrentTime] = useState<string>('');

	const folderItems = [
		{ imageSrc: '/images/intro/heart.png', label: '내 컴퓨터' },
		{ imageSrc: '/images/intro/folder.png', label: '기밀문서' },
		{ imageSrc: '/images/intro/folder.png', label: '외부\n인트라넷' },
		{ imageSrc: '/images/intro/setting.png', label: '중앙제어' },
		{ imageSrc: '/images/intro/secure.png', label: '보안 증명' },
	];

	useEffect(() => {
		// 시간 업데이트 함수
		const updateTime = () => {
			const now = new Date();
			const hours = now.getHours();
			const minutes = now.getMinutes();
			const period = hours >= 12 ? 'PM' : 'AM';
			const formattedHours = hours % 12 || 12;
			const formattedMinutes = minutes.toString().padStart(2, '0');
			setCurrentTime(`${formattedHours}:${formattedMinutes} ${period}`);
		};

		// 초기 시간 설정
		updateTime();

		// 1초마다 시간 업데이트
		const intervalId = setInterval(updateTime, 1000);

		// 컴포넌트 언마운트 시 인터벌 정리
		return () => clearInterval(intervalId);
	}, []);

	// 애니메이션
	useEffect(() => {
		const tl = gsap.timeline({
			defaults: { ease: "power2.out" }
		});

		// 초기 상태 설정
		gsap.set(containerRef.current, { opacity: 0 });
		gsap.set(headerRef.current, { y: -50, opacity: 0 });
		gsap.set(computerRef.current, { scale: 0.8, opacity: 0 });
		gsap.set(folderRefs.current, { y: 30, opacity: 0 });

		// 부팅 시퀀스 애니메이션
		tl.to(containerRef.current, {
			opacity: 1,
			duration: 0.5
		})
			.to(headerRef.current, {
				y: 0,
				opacity: 1,
				duration: 0.8
			})
			.to(computerRef.current, {
				scale: 1,
				opacity: 1,
				duration: 0.8
			})
			.to(folderRefs.current, {
				y: 0,
				opacity: 1,
				duration: 0.5,
				stagger: 0.1
			});

		// 깜빡이는 커서 효과
		gsap.to('.currentTime', {
			opacity: 0.5,
			duration: 0.8,
			repeat: -1,
			yoyo: true
		});
	}, []);

	useEffect(() => {
		const soundManager = SoundManager.getInstance();
		soundManager.loadSound('boot', '/sounds/intranet/boot.wav');
		soundManager.playSFX('boot');
	}, []);

	return (
		<main className={style.container} ref={containerRef}>
			<header className={style.header} ref={headerRef}>
             <span className="system-text">
                California Station Intranet v1.8
             </span>
				<span className="connection-status">중앙 서버 연결됨</span>
			</header>
			<div className={style.computer} ref={computerRef}>
				<section className={style.computerData}>
					{folderItems.map((item, index) => (
						<div
							key={index}
							ref={el => folderRefs.current[index] = el}
						>
							<FolderItem
								imageSrc={item.imageSrc}
								label={item.label}
							/>
						</div>
					))}
				</section>
				<section className={style.timerContainer}>
					<span className={`${style.currentTime} currentTime`}>현재 시각</span>
					<span className={style.time}>{currentTime}</span>
				</section>
			</div>
			<USPoliceLogo/>
			<ProgramBootScreen />
		</main>
	)
}

export default BootProgram;