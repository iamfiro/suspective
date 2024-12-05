import style from '../../../styles/scene/game/ingame.module.scss';
import SuspectImage from '../../../../public/images/ingame/suspect.png';
export const SceneInGame = () => {
	return (
		<div className={style.container}>
			<section className={style.suspectList}>
				<article className={style.suspectItem}>
					<img className={style.suspectImage} src={SuspectImage} alt={'범죄자 새끼'}/>
					<span>한유찬, 57세</span>
				</article>
				<article className={style.suspectItem}>
					<img className={style.suspectImage} src={'https://img.wowtv.co.kr/wowtv_news/dnrs/20220930/2022093010334703116d3244b4fed182172185139.jpg'} alt={'범죄자 새끼'}/>
					<span>한유찬, 57세</span>
				</article>
				<article className={style.suspectItem}>
					<img className={style.suspectImage} src={SuspectImage} alt={'범죄자 새끼'}/>
					<span>한유찬, 57세</span>
				</article>
			</section>
		</div>
	)
}