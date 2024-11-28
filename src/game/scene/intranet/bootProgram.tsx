import style from '../../../styles/scene/intranet/bootProgram.module.scss';
import USPoliceLogo from "../../component/intranet/usPoliceLogo.tsx";
import FolderItem from "../../component/intranet/program.tsx";

const BootProgram = () => {
	const folderItems = [
		{ imageSrc: '/images/intro/heart.png', label: '내 컴퓨터' },
		{ imageSrc: '/images/intro/folder.png', label: '기밀문서' },
		{ imageSrc: '/images/intro/folder.png', label: '외부\n인트라넷' },
		{ imageSrc: '/images/intro/setting.png', label: '중앙제어' },
		{ imageSrc: '/images/intro/secure.png', label: '보안 증명' },
	];

	return (
		<main className={style.container}>
			<header className={style.header}>
             <span>
                California Station Intranet v1.8
             </span>
				<span>인트라넷 연결됨</span>
			</header>
			<div className={style.computer}>
				<section className={style.computerData}>
					{folderItems.map((item, index) => (
						<FolderItem
							key={index}
							imageSrc={item.imageSrc}
							label={item.label}
						/>
					))}
				</section>
				<section className={style.timerContainer}>
					<span className={style.currentTime}>현재 시각</span>
					<span className={style.time}>6:11 PM</span>
				</section>
			</div>
			<USPoliceLogo/>
		</main>
	)
}

export default BootProgram;