import style from '../../../styles/scene/macbook/index.module.scss'
import MenuBar from "../../components/macbook/menuBar.tsx";
import {DesktopIcon} from "../../components/macbook/desktopIcon.tsx";
import {DesktopItemType} from "../../../types/program.ts";
import useBackgroundSelectedIcon from "../../../states/backgroundSelectedIcon.ts";

export const Macbook = () => {
    const {setSelectedName} = useBackgroundSelectedIcon();

    const handleClickBackground = () => {
        setSelectedName('');
    }

    return (
        <main className={style.container}>
            <MenuBar />
            <section
                className={style.content}
                onClick={handleClickBackground}
            >
                <DesktopIcon type={DesktopItemType.folder} name={'중요한거'}/>
            </section>
        </main>
    )
}

export default Macbook;