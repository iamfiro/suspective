import {useRandomGridPositions} from "../../../hooks/useRandomGridPositions.ts";
import {MACBOOK_BACKGROUND_PROGRAMS} from "../../../constant/macbook.ts";
import DesktopIcon from "./desktopIcon.tsx";

const MENU_BAR_HEIGHT = 30;
const WIDGET_WIDTH = 300;

export const DesktopProgramList = () => {
    const positions = useRandomGridPositions(MACBOOK_BACKGROUND_PROGRAMS.length, {
        gridSize: 100,
        padding: 20,
        menuBarHeight: MENU_BAR_HEIGHT,
        widgetWidth: WIDGET_WIDTH,
    });

    return (
        <>
            {MACBOOK_BACKGROUND_PROGRAMS.map(({ type, name, icon }, index) => {
                const { x, y } = positions[index];

                return (
                    <DesktopIcon
                        key={name}
                        type={type}
                        name={name}
                        iconSrc={icon}
                        x={x}
                        y={y}
                    />
                );
            })}
        </>
    )
}