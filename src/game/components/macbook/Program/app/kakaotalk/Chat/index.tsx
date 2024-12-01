import style from './style.module.scss';
import { MdPeopleAlt } from "react-icons/md";
import {ChatBubble, ChatMessage} from "../Bubble";

interface RoomProps {
    roomId: string | null;
}

export const KakaoTalkChat = ({roomId}: RoomProps) => {
    const DATA = {
        id: roomId,
        name: '도도한 왕자님들의 모임',
        roomProfileUrl: "https://play-lh.googleusercontent.com/cQwhJM-8imz4TmAAEFFhXIydURdfAZ2YlMSsuEl4gkvDJKq_UZlJagZ5qZUEUx0Odmg",
        participants: 3,
    }

    const CHAT_MESSAGES: ChatMessage[] = [
        {
            id: '1',
            userId: 'user1',
            userName: '도도한 왕자',
            profileUrl: 'https://play-lh.googleusercontent.com/cQwhJM-8imz4TmAAEFFhXIydURdfAZ2YlMSsuEl4gkvDJKq_UZlJagZ5qZUEUx0Odmg',
            content: '오늘 모임 시간이 어떻게 되나요?',
            timestamp: '오후 2:30',
            isMe: false
        },
        {
            id: '2',
            userId: 'user2',
            userName: '우아한 왕자',
            profileUrl: 'https://play-lh.googleusercontent.com/cQwhJM-8imz4TmAAEFFhXIydURdfAZ2YlMSsuEl4gkvDJKq_UZlJagZ5qZUEUx0Odmg',
            content: '저는 6시 이후면 괜찮습니다!',
            timestamp: '오후 2:31',
            isMe: false
        },
        {
            id: '3',
            userId: 'me',
            userName: '나',
            content: '저도 6시 이후 가능합니다',
            timestamp: '오후 2:31',
            isMe: true
        },
        {
            id: '4',
            userId: 'user1',
            userName: '도도한 왕자',
            profileUrl: 'https://play-lh.googleusercontent.com/cQwhJM-8imz4TmAAEFFhXIydURdfAZ2YlMSsuEl4gkvDJKq_UZlJagZ5qZUEUx0Odmg',
            content: '그럼 저녁 7시에 만나는 걸로 할까요?',
            timestamp: '오후 2:32',
            isMe: false
        },
        {
            id: '6',
            userId: 'user2',
            userName: '우아한 왕자',
            profileUrl: 'https://play-lh.googleusercontent.com/cQwhJM-8imz4TmAAEFFhXIydURdfAZ2YlMSsuEl4gkvDJKq_UZlJagZ5qZUEUx0Odmg',
            content: '네 좋아요 👍',
            timestamp: '오후 2:33',
            isMe: false
        },
        {
            id: '7',
            userId: 'me',
            userName: '나',
            content: '알겠습니다!',
            timestamp: '오후 2:33',
            isMe: true
        },
    ];

    return (
        <div className={style.container}>
            <header className={style.header}>
                <img src={DATA.roomProfileUrl} alt="room profile" className={style.roomProfile} />
                <div className={style.roomData}>
                    <span className={style.roomName}>{DATA.name}</span>
                    <div className={style.participants}>
                        <MdPeopleAlt />
                        <span>{DATA.participants}</span>
                    </div>
                </div>
            </header>
            <div className={style.chat}>
                {CHAT_MESSAGES.map((message, index, array) => {
                    const showProfile = index === 0 ||
                        (array[index - 1].userId !== message.userId) ||
                        (new Date(message.timestamp).getTime() - new Date(array[index - 1].timestamp).getTime() > 300000);

                    return (
                        <ChatBubble
                            key={message.id}
                            message={message}
                            showProfile={!message.isMe && showProfile}
                        />
                    );
                })}
            </div>
            <div className={style.input}>
                <span>추모 프로필로 설정된 계정에서는 대화가 불가능합니다.</span>
                <button>뒤로가기</button>
            </div>
        </div>
    )
}