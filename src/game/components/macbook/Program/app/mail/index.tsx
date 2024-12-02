import {useEffect, useState} from 'react';
import style from './style.module.scss';
import MacProgram from "../../index.tsx";
import {LuInbox, LuSearch} from "react-icons/lu";
import {useMailStore} from "../../../../../../states/mail.ts";
import {Mail as MailType} from "../../../../../../types/mail.ts"; // Mail 타입을 import

interface MailItemProps {
	id: string;
	sender: string;
	title: string;
	content: string;
	isSelected: boolean;
	onClick: () => void;
}

interface MailContentProps {
	mail: MailType | undefined;
}

const MailItem = ({sender, title, content, isSelected, onClick}: MailItemProps) => {
	return (
		<article
			className={`${style.mailItem} ${isSelected ? style.selected : ''}`}
			onClick={onClick}
		>
			<span className={style.sender}>{sender}</span>
			<span className={style.title}>{title}</span>
			<span className={style.content}>{content}</span>
		</article>
	);
};

const MailContent = ({mail}: MailContentProps) => {
	if (!mail) return <div className={style.noMailSelected}>선택된 메일이 없습니다</div>;

	return (
		<>
			<header className={style.contentHeader}>
				<div className={style.senderData}>
					<div className={style.profileBackground}>
						<span>{mail.sender.substring(0, 2).toUpperCase()}</span>
					</div>
					<div className={style.mailData}>
						<span>{mail.sender}</span>
						<span>{mail.title}</span>
					</div>
				</div>
				<span className={style.time}>
                    {new Date(mail.timestamp).toLocaleTimeString([], {
	                    hour: '2-digit',
	                    minute: '2-digit'
                    })}
                </span>
			</header>
			<article className={style.htmlContent}>
				{mail.component || mail.content}
			</article>
		</>
	);
};

export const Mail = ({id}: { id: string }) => {
	const {
		mails,
		selectedMailId,
		searchQuery,
		setSelectedMail,
		setSearchQuery,
		getFilteredMails,
		getSelectedMail
	} = useMailStore();

	const [searchInput, setSearchInput] = useState(searchQuery);
	const filteredMails = getFilteredMails();
	const selectedMail = getSelectedMail();

	useEffect(() => {
		const timer = setTimeout(() => {
			setSearchQuery(searchInput);
		}, 300);

		return () => clearTimeout(timer);
	}, [searchInput]);

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
						<span>{mails.length}</span>
					</div>
				</aside>
				<section className={style.mailList}>
					<header className={style.header}>
						<span className={style.title}>받은 편지함</span>
						<div className={style.searchContainer}>
							<LuSearch className={style.searchIcon}/>
							<input
								type="text"
								placeholder="메일 검색"
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
								className={style.searchInput}
							/>
						</div>
					</header>
					<div className={style.mailListContainer}>
						{filteredMails.map((mail) => (
							<MailItem
								key={mail.id}
								id={mail.id}
								sender={mail.sender}
								title={mail.title}
								content={mail.content}
								isSelected={mail.id === selectedMailId}
								onClick={() => setSelectedMail(mail.id)}
							/>
						))}
					</div>
				</section>
				<section className={style.mailContent}>
					<MailContent mail={selectedMail}/>
				</section>
			</div>
		</MacProgram>
	);
};

export default Mail;