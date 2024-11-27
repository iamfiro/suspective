import {useEffect, useState} from "react";
import style from '../../../styles/scene/welcomeToStation.module.scss';
import ConversationDisplay from "../../component/conversationDisplay.tsx";

interface IConversation {
    character: 'boss' | 'me'
    text: string
    audioPath: string
    duraction: number
}

const WelcomeToStation = () => {
    const [isInitialized, setIsInitialized] = useState(false);
    const conversation: IConversation[] = [
        {
            character: 'me',
            text: '',
            audioPath: '/sounds/welcome/car_stop.mp3',
            duraction: 6,
        },
        {
            character: 'boss',
            text: 'Welcome to the station',
            audioPath: '/audio/boss/welcomeToStation.mp3',
            duraction: 3
        },
        {
            character: 'me',
            text: 'Thank you, sir',
            audioPath: '/audio/me/thankYouSir.mp3',
            duraction: 3
        },
        {
            character: 'boss',
            text: 'I hope you will enjoy your stay here',
            audioPath: '/audio/boss/enjoyYourStay.mp3',
            duraction: 3
        },
        {
            character: 'me',
            text: 'I will do my best',
            audioPath: '/audio/me/iWillDoMyBest.mp3',
            duraction: 3
        }
    ];

    return (
        <div className={style.container}>
            <ConversationDisplay
                conversation={conversation}
                className={style.text}
            />
            <span onClick={() => setIsInitialized((init) => {
                if (init) {
                    window.location.href = '/disclaimer';
                }
                return init;
            })}></span>

        </div>
    )
}

export default WelcomeToStation;