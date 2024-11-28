import {useEffect, useState} from "react";
import style from '../../../styles/scene/welcomeToStation.module.scss';
import ConversationDisplay from "../../component/conversationDisplay.tsx";

interface IConversation {
    character: 'boss' | 'me'
    text: string
    audioPath: string
    duration: number
}

const WelcomeToStation = () => {
    const [isInitialized, setIsInitialized] = useState(false);
    const conversation: IConversation[] = [
        {
            character: 'boss',
            text: '안녕, 에밀리',
            audioPath: '/sounds/welcome/jack/a1.mp3',
            duration: 1,
        },
        {
            character: 'boss',
            text: '우리 형사과에 새로 들어온걸 환영해.',
            audioPath: '/sounds/welcome/jack/a2.mp3',
            duration: 3,
        },
        {
            character: 'boss',
            text: '너 어디 출신이니?',
            audioPath: '/sounds/welcome/jack/a3.mp3',
            duration: 2,
        },
        {
            character: 'me',
            text: '저는 캘리포니아 출신입니다. 어릴때부터 거기서 자랐습니다.',
            audioPath: '/sounds/welcome/emily/b1.mp3',
            duration: 2,
        },
        {
            character: 'boss',
            text: '아, 그래? 나도 캘리포니아 출신인데',
            audioPath: '/sounds/welcome/jack/a4.mp3',
            duration: 2,
        },
        {
            character: 'boss',
            text: '마침 우리 부서에 캘리포니아 관련 미제 사건이 꽤 많아',
            audioPath: '/sounds/welcome/jack/a5.mp3',
            duration: 6,
        },
        {
            character: 'me',
            text: '정말요?',
            audioPath: '/sounds/welcome/emily/b2.mp3',
            duration: 1,
        },
        {
            character: 'boss',
            text: '우리 부서가 미제 사건으로 넘쳐나거든',
            audioPath: '/sounds/welcome/jack/a6.mp3',
            duration: 4,
        },
        {
            character: 'boss',
            text: '지금 내가 맡은 사건 말고도 하나 더 조사해야 할 것 같아',
            audioPath: '/sounds/welcome/jack/a7.mp3',
            duration: 5,
        },
        {
            character: 'me',
            text: '알겠어요. 그럼 어디서부터 시작하면 좋을까요?',
            audioPath: '/sounds/welcome/emily/b3.mp3',
            duration: 3,
        },
        {
            character: 'boss',
            text: '네 감으로 골라봐. 개인적으로 흥미로운 사건이든',
            audioPath: '/sounds/welcome/jack/a8.mp3',
            duration: 3,
        },
        {
            character: 'boss',
            text: '유망한 단서가 있는 사건이든 네가 끌리는 걸로 시작해 봐.',
            audioPath: '/sounds/welcome/jack/a9.mp3',
            duration: 3,
        },
        {
            character: 'me',
            text: '알겠습니다. 자료 좀 살펴보고 어떤 걸로 할지 알려드릴게요',
            audioPath: '/sounds/welcome/emily/b4.mp3',
            duration: 4,
        },
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