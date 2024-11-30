import style from '../../../styles/scene/macbook/index.module.scss'
import MenuBar from "../../components/macbook/menuBar.tsx";
import {DesktopIcon} from "../../components/macbook/desktopIcon.tsx";
import {DesktopItemType} from "../../../types/program.ts";

export const Macbook = () => {
    return (
        <main className={style.container}>
            <MenuBar />
            <DesktopIcon type={DesktopItemType.folder} name={'중요한거'}/>
        </main>
    )
}

export default Macbook;