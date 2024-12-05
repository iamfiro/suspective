import {useEffect, useState} from "react";
import {createSceneManager, SceneRenderer} from "./engine/scene/sceneManager.tsx";
import SceneMacBootScreen from "./game/scenes/macbook/bootScreen.tsx";
import {MacLoginScreen} from "./game/scenes/macbook/loginScreen.tsx";
import TimeManager from "./engine/Time/TimeManager.ts";
import Macbook from "./game/scenes/macbook";
import IntroScene from "./game/scenes/intro/introScene.tsx";
import FictionDisclaimer from "./game/scenes/intro/fictionDisclaimer.tsx";
import WelcomeToStation from "./game/scenes/intro/welcomeToStation.tsx";
import IntranetBoot from "./game/scenes/intranet/boot.tsx";
import IntranetBootOS from "./game/scenes/intranet/bootOS.tsx";
import BootProgram from "./game/scenes/intranet/bootProgram.tsx";
import IntranetLogin from "./game/scenes/intranet/login.tsx";
import DifficultySelect from "./game/scenes/intranet/DifficultySelect.tsx";
import MissionList from "./game/scenes/intranet/missionList.tsx";
import {SceneInGame} from "./game/scenes/game/ingame.tsx";

function App() {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const timeManager = TimeManager.getInstance();
        // 시간을 Date 객체로 명시적으로 생성
        const initialDate = new Date('2023-04-28T06:46:00');

        // Date 객체가 유효한지 확인
        if (isNaN(initialDate.getTime())) {
            console.error('Invalid initial date');
            return;
        }

        timeManager.setTime(initialDate);
        timeManager.start();

        // cleanup 함수 추가
        return () => {
            timeManager.stop();
        };
    }, []);

    useEffect(() => {
        createSceneManager([
            {
                path: '/intro',
                component: () => <IntroScene />
            },
            {
                path: '/disclaimer',
                component: () => <FictionDisclaimer />
            },
            {
                path: '/welcomeToStation',
                component: () => <WelcomeToStation />
            },
            // intraNet
            {
                path: '/intranetBoot',
                component: () => <IntranetBoot />
            },
            {
                path: '/intranetBootOS',
                component: () => <IntranetBootOS />
            },
            {
                path: '/intranetBootProgram',
                component: () => <BootProgram />
            },
            {
                path: '/intranetLogin',
                component: () => <IntranetLogin />
            },
            {
                path: '/difficultySelect',
                component: () => <DifficultySelect />
            },
            {
                path: '/missionList',
                component: () => <MissionList />
            },
            {
                path: '/macbook/boot',
                component: () => <SceneMacBootScreen />
            },
            {
                path: '/macbook/login',
                component: () => <MacLoginScreen />
            },
            {
                path: '/macbook/desktop',
                component: () => <Macbook />
            },
            {
                path: '/game',
                component: () => <SceneInGame />
            }
        ]);
        setIsInitialized(true);
    }, []);

    if (!isInitialized) {
        return null; // 또는 로딩 인디케이터를 표시할 수 있습니다
    }

    return (
        <>
            <SceneRenderer initialScene={'/game'} />
        </>
    )
}

export default App
