import style from '../../../styles/scene/macbook/index.module.scss'
import useBackgroundSelectedIcon from "../../../states/backgroundSelectedIcon.ts";
import {MenuBar} from "../../components/macbook/menuBar";
import {DesktopProgramList} from "../../components/macbook/desktopProgramList";
import {ReminderWidget} from "../../components/macbook/reminderWidget";
import Dock from "../../components/macbook/dock";
import {useMacPrograms} from "../../../states/useMacPrograms.ts";
import {Kakaotalk} from "../../components/macbook/Program/app/kakaotalk";
import {Mail} from "../../components/macbook/Program/app/mail";
import {useEffect} from "react";

interface ProgramComponentProps {
    id: string;
    args?: Record<string, string | boolean | number>;
}

// 프로그램 컴포넌트 매핑
const PROGRAM_COMPONENTS: Record<string, React.ComponentType<ProgramComponentProps>> = {
    'kakaotalk': Kakaotalk,
    'mail': Mail,
};

export const Macbook = () => {
    const {setSelectedName} = useBackgroundSelectedIcon();
    const {programs} = useMacPrograms();

    useEffect(() => {
        console.log(programs)
    }, [programs]);

    const handleClickBackground = () => {
        setSelectedName('');
    }

    const renderProgram = (program: ProgramComponentProps) => {
        const ProgramComponent = PROGRAM_COMPONENTS[program.id];

        if (!ProgramComponent) {
            console.warn(`No component found for program: ${program.id}`);
            return null;
        }

        return (
            <ProgramComponent
                key={program.id}
                id={program.id}
                {...program.args} // 프로그램별 인자 전달
            />
        );
    };

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
            <Dock />
            {programs.map(renderProgram)}
        </main>
    )
}

export default Macbook;