import style from './style.module.scss';
import MacProgram from "../../index.tsx";
import {KakaoTalkRoomList} from "./RoomList";
import {useState} from "react";
import {KakaoTalkChat} from "./Chat";

export const Kakaotalk = ({id}: {id: string}) => {
    const [page, setPage] = useState<'room_list' | 'chat'>('room_list');
    const [roomId, setRoomId] = useState<string | null>(null);

    return (
        <MacProgram
            id={id}
            title="Calculator"
            icon="/icons/calculator.png"
        >
            <div className={style.container}>
                {
                    page === 'room_list' ? (
                        <KakaoTalkRoomList
                            onSelectRoom={(roomId) => {
                                setRoomId(roomId);
                                setPage('chat');
                            }}
                        />
                    ) : (
                        <KakaoTalkChat roomId={roomId} />
                    )
                }
            </div>
        </MacProgram>
    )
}