import style from './desktopIcon.module.scss';
import {DesktopItemType} from "../../../types/program.ts";
import {useState} from "react";

interface DesktopFolderProps {
    type: DesktopItemType;
    name: string;
}

export const DesktopIcon = ({ type, name }: DesktopFolderProps) => {
    const [isClicked, setIsClicked] = useState(false);
    switch (type) {
        case "application":
            return (
                <></>
            );
        case "folder":
            return (
                <div
                    className={style.container}
                    onClick={() => {
                        console.log('clicked')
                        setIsClicked(true);
                        console.log(isClicked);
                    }}
                    data-clicked={isClicked}
                >
                    <div className={style.iconContainer}>
                        <img src="/images/macbook/folder.webp" alt={`${name} folder`} className={style.icon} />
                    </div>
                    <div className={style.nameContainer}>
                        <span>{name}</span>
                    </div>
                </div>
            );
        case "image":
            return (
                <></>
            );
        default:
            return (
                <>unknown types</>
            );
    }
};

export default DesktopIcon;