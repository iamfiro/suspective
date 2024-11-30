import style from './desktopIcon.module.scss';
import {DesktopItemType} from "../../../types/program.ts";
import useBackgroundSelectedIcon from "../../../states/backgroundSelectedIcon.ts";

interface DesktopFolderProps {
    type: DesktopItemType;
    name: string;
}

export const DesktopIcon = ({ type, name }: DesktopFolderProps) => {
    const {setSelectedName, selectedName} = useBackgroundSelectedIcon();

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
                        console.log(`clicked ${name}`);
                        setSelectedName(name);
                        console.log(`selectedName: ${selectedName}`);
                    }}

                    data-clicked={selectedName === name}
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