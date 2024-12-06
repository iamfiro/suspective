import style from '../../../styles/scene/game/ingame.module.scss';
import SuspectImage from '../../../../public/images/ingame/suspect.png';
import {SuspectList} from "../../components/game/suspectList.tsx";

export const SceneInGame = () => {
	const suspects = [
		{
			imageSrc: SuspectImage,
			name: '한유찬',
			age: 57
		},
		{
			imageSrc: 'https://img.wowtv.co.kr/wowtv_news/dnrs/20220930/2022093010334703116d3244b4fed182172185139.jpg',
			name: '한유찬',
			age: 57
		},
		{
			imageSrc: SuspectImage,
			name: '한유찬',
			age: 57
		}
	];

	return (
		<div className={style.container}>
			<SuspectList suspects={suspects}/>
		</div>
	);
};