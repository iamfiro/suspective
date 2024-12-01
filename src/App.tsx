import {useEffect, useState} from "react";
import {createSceneManager, SceneRenderer} from "./engine/scene/sceneManager.tsx";
import SceneMacBootScreen from "./game/scenes/macbook/bootScreen.tsx";
import {MacLoginScreen} from "./game/scenes/macbook/loginScreen.tsx";
import TimeManager from "./engine/Time/TimeManager.ts";
import Macbook from "./game/scenes/macbook";

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
            }
        ]);
        setIsInitialized(true);
    }, []);

    if (!isInitialized) {
        return null; // 또는 로딩 인디케이터를 표시할 수 있습니다
    }

    return (
        <>
            <SceneRenderer initialScene={'/macbook/desktop'} />
        </>
    )
}

export default App
