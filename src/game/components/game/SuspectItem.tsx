import style from '../../../styles/scene/game/suspectItem.module.scss';

interface SuspectItemProps {
    imageSrc: string;
    name: string;
    age: number;
}

export const SuspectItem = ({ imageSrc, name, age }: SuspectItemProps) => {
    return (
        <article className={style.suspectItem}>
            <img className={style.suspectImage} src={imageSrc} alt={`용의자 ${name}`}/>
            <span className={style.suspectName}>{name}, {age}세</span>
        </article>
    );
};