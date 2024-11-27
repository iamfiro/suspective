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
            duraction: 8,
        },
        {
            character: 'boss',
            text: 'Welcome to the station',
            audioPath: '/sounds/welcome/welcomeToStation.mp3',
            duraction: 3
        },
        {
            character: 'me',
            text: 'Thank you, sir',
            audioPath: '/sounds/welcome/thankYouSir.mp3',
            duraction: 3
        },
        {
            character: 'boss',
            text: 'I hope you will enjoy your stay here',
            audioPath: '/sounds/welcome/enjoyYourStay.mp3',
            duraction: 3
        },
        {
            character: 'me',
            text: 'I will do my best',
            audioPath: '/sounds/welcome/iWillDoMyBest.mp3',
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