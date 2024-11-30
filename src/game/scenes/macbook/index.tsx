import style from '../../../styles/scene/macbook/index.module.scss'
import MenuBar from "../../components/macbook/menuBar.tsx";
import useBackgroundSelectedIcon from "../../../states/backgroundSelectedIcon.ts";
import {DesktopProgramList} from "../../components/macbook/desktopProgramList.tsx";

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
                <DesktopProgramList />
            </section>
        </main>
    )
}

export default Macbook;