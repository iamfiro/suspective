import style from './style.module.scss';
import {KakaoTalkNavBar} from "../NavBar";

interface RoomProps {
    name: string;
    lastMessage: string;
    time: string;
    unreadCount?: number;
    profileImage?: string;
}

export const Room = ({ name, lastMessage, time, unreadCount, profileImage }: RoomProps) => {
    return (
        <div className={style.room}>
            <div className={style.profileImage}>
                {profileImage ? (
                    <img src={profileImage} alt={name} />
                ) : (
                    <div className={style.defaultProfile}>{name[0]}</div>
                )}
            </div>
            <div className={style.info}>
                <div className={style.nameRow}>
                    <span className={style.name}>{name}</span>
                    <span className={style.time}>{time}</span>
                </div>
                <div className={style.messageRow}>
                    <p className={style.lastMessage}>{lastMessage}</p>
                    {unreadCount && unreadCount > 0 && (
                        <span className={style.unreadCount}>{unreadCount}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export const KakaoTalkRoomList = () => {
    const rooms: RoomProps[] = [
        {
            name: "가족 단톡방",
            lastMessage: "오늘 저녁에 뭐먹을까요?",
            time: "오후 2:30",
            unreadCount: 3,
            profileImage: "https://play-lh.googleusercontent.com/cQwhJM-8imz4TmAAEFFhXIydURdfAZ2YlMSsuEl4gkvDJKq_UZlJagZ5qZUEUx0Odmg"
        },
        {
            name: "회사 동기들",
            lastMessage: "다들 퇴근했어?",
            time: "오후 1:15",
            unreadCount: 1
        }
    ];

    return (
        <div className={style.container}>
            <KakaoTalkNavBar selected={'chat'} />
            <div className={style.main}>
                <header className={style.header}>
                    <h1 className={style.title}>채팅</h1>
                </header>
                <div className={style.roomList}>
                    {rooms.map((room, index) => (
                        <Room key={index} {...room} />
                    ))}
                </div>
            </div>
        </div>
    );
};