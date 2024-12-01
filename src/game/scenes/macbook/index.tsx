import style from '../../../styles/scene/macbook/index.module.scss'
import useBackgroundSelectedIcon from "../../../states/backgroundSelectedIcon.ts";
import {MenuBar} from "../../components/macbook/menuBar";
import {DesktopProgramList} from "../../components/macbook/desktopProgramList";
import {ReminderWidget} from "../../components/macbook/reminderWidget";

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
            <ReminderWidget />
        </main>
    )
}

export default Macbook;