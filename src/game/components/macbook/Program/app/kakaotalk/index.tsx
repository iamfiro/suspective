import style from './style.module.scss';
import MacProgram from "../../index.tsx";
import {KakaoTalkRoomList} from "./RoomList";

export const Kakaotalk = ({id}: {id: string}) => {
    return (
        <MacProgram
            id={id}
            title="Calculator"
            icon="/icons/calculator.png"
        >
            <div className={style.container}>
                <KakaoTalkRoomList />
            </div>
        </MacProgram>
    )
}