import style from '../../../styles/scene/game/suspectList.module.scss';
import {SuspectItem} from './SuspectItem';

interface Suspect {
	imageSrc: string;
	name: string;
	age: number;
}

interface SuspectListProps {
	suspects: Suspect[];
}

export const SuspectList = ({suspects}: SuspectListProps) => {
	return (
		<section className={style.suspectList}>
			{suspects.map((suspect, index) => (
				<SuspectItem
					key={index}
					imageSrc={suspect.imageSrc}
					name={suspect.name}
					age={suspect.age}
				/>
			))}
		</section>
	);
};