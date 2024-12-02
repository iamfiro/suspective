import style from '../../../styles/scene/macbook/index.module.scss';
import useBackgroundSelectedIcon from "../../../states/backgroundSelectedIcon.ts";
import {MenuBar} from "../../components/macbook/menuBar";
import {DesktopProgramList} from "../../components/macbook/desktopProgramList";
import {ReminderWidget} from "../../components/macbook/reminderWidget";
import Dock from "../../components/macbook/dock";
import {useMacPrograms} from "../../../states/useMacPrograms.ts";
import {Kakaotalk} from "../../components/macbook/Program/app/kakaotalk";
import {Mail} from "../../components/macbook/Program/app/mail";
import {useEffect} from "react";
import {NotificationContainer} from "../../components/macbook/notification/container";
import {useMailStore} from "../../../states/mail.ts";

interface ProgramComponentProps {
	id: string;
	args?: Record<string, string | boolean | number>;
}

// 프로그램 컴포넌트 매핑
const PROGRAM_COMPONENTS: Record<string, React.ComponentType<ProgramComponentProps>> = {
	'kakaotalk': Kakaotalk,
	'mail': Mail,
};

export const Macbook = () => {
	const {setSelectedName} = useBackgroundSelectedIcon();
	const {programs} = useMacPrograms();

	useEffect(() => {
		// setInterval(() => {
		// 	useNotificationStore.getState().addNotification({
		// 		appName: 'Mail',
		// 		icon: MessageIcon,
		// 		title: '새로운 메일',
		// 		content: '날 찾을 수 있을 것 같아?',
		// 		duration: 3000,
		// 		onClick: () => console.log('notification clicked'),
		// 		glitch: {
		// 			text: '71yuchan@sex.com',
		// 			interval: 100,
		// 			target: 'title'
		// 		}
		// 	});
		// }, 1000);

		useMailStore.getState().addMail({
			id: Math.random().toString(),
			sender: '71yuchan@sex',
			title: '새로운 메일',
			content: '날 찾을 수 있을 것 같아?',
			timestamp: '2021-08-01 12:00:00',
			component: <div>내용</div>
		});
	}, []);

	const handleClickBackground = () => {
		setSelectedName('');
	}

	const renderProgram = (program: ProgramComponentProps) => {
		const ProgramComponent = PROGRAM_COMPONENTS[program.id];

		if (!ProgramComponent) {
			console.warn(`No component found for program: ${program.id}`);
			return null;
		}

		return (
			<ProgramComponent
				key={program.id}
				id={program.id}
				{...program.args} // 프로그램별 인자 전달
			/>
		);
	};

	return (
		<main className={style.container}>
			<MenuBar/>
			<section
				className={style.content}
				onClick={handleClickBackground}
			>
				<DesktopProgramList/>
			</section>
			<ReminderWidget/>
			<Dock/>
			<NotificationContainer/>
			{programs.map(renderProgram)}
		</main>
	)
}

export default Macbook;