import { FC } from 'react';
import style from './program.module.scss';

interface FolderItemProps {
    imageSrc: string;
    label: string;
}

const FolderItem: FC<FolderItemProps> = ({ imageSrc, label }) => {
    return (
        <article
            className={style.folder}
        >
            <img src={imageSrc} alt={label} />
            <span style={{ textAlign: label.includes('\n') ? 'center' : 'left' }}>
                {label}
            </span>
        </article>
    );
};

export default FolderItem;