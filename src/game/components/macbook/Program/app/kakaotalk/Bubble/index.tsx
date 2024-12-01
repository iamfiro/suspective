// components/ChatBubble.tsx
import style from './style.module.scss';

export interface ChatMessage {
    id: string;
    userId: string;
    userName: string;
    profileUrl?: string;
    content: string;
    timestamp: string;
    isMe: boolean;
}

interface ChatBubbleProps {
    message: ChatMessage;
    showProfile?: boolean;
}

export const ChatBubble = ({ message, showProfile = true }: ChatBubbleProps) => {
    if (message.isMe) {
        return (
            <div className={style.myMessage}>
                <span className={style.timestamp}>{message.timestamp}</span>
                <div className={style.content}>{message.content}</div>
            </div>
        );
    }

    return (
        <div className={style.otherMessage}>
            {showProfile && (
                <img
                    src={message.profileUrl}
                    alt={`${message.userName}'s profile`}
                    className={style.profile}
                />
            )}
            <div className={style.messageContainer}>
                {showProfile && <span className={style.userName}>{message.userName}</span>}
                <div className={style.contentWrapper}>
                    <div className={style.content}>{message.content}</div>
                    <span className={style.timestamp}>{message.timestamp}</span>
                </div>
            </div>
        </div>
    );
};