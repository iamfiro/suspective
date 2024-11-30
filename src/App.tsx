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
        // 초기 시간 설정
        timeManager.setTime(new Date('2024-11-30T06:46:00'));

        timeManager.start();
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
