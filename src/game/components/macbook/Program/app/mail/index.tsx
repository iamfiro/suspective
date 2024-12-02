import style from './style.module.scss';
import MacProgram from "../../index.tsx";
import {LuInbox} from "react-icons/lu";

const MailItem = () => {
	return (
		<article className={style.mailItem}>
			<span className={style.sender}>GeekNews Daily</span>
			<span className={style.title}>[GN#282] 제품 속도에 대한 원칙</span>
			<span className={style.content}>스타트업 초기에는 빠르게 제품을 만들지만 점차 느려지게 됩니다. 기술 부채부터 복잡해진 요구사항, 기존 작업과 연동되면서 고려할 것들이 많아지니 당연히 더 오래 걸리는 게 맞는데요. 복잡한 프로세스가 발목을 붙잡거나, 어디서 들어오는지 모르는 이상하고</span>
		</article>
	)
}

export const Mail = ({id}: { id: string }) => {
	return (
		<MacProgram
			id={id}
			title="메일"
			icon="/icons/mail.png"
		>
			<div className={style.container}>
				<aside className={style.aside}>
					<span className={style.category}>즐겨찾기</span>
					<div className={style.categoryButton}>
						<LuInbox color={'#1c73e8'}/>
						<span>받은 편지함</span>
					</div>
				</aside>
				<section className={style.mailList}>
					<header className={style.header}>
						<span className={style.title}>받은 편지함</span>
					</header>
					<div className={style.mailListContainer}>
						<MailItem/>
					</div>
				</section>
				<section className={style.mailContent}>
					<header className={style.contentHeader}>
						<div className={style.senderData}>
							<div className={style.profileBackground}>
								<span>GW</span>
							</div>
							<div className={style.mailData}>
								<span>GeekNews Daily</span>
								<span>[GN#282] 제품 속도에 대한 원칙</span>
							</div>
						</div>
						<span className={style.time}>10:18 AM</span>
					</header>
					<article className={style.htmlContent}>

					</article>
				</section>
			</div>
		</MacProgram>
	)
}