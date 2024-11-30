import IntroScene from "./game/scenes/intro/introScene";
import {useEffect, useState} from "react";
import {createSceneManager, SceneRenderer} from "./engine/scene/sceneManager.tsx";
import SceneMacBootScreen from "@scene/macbook/boot/sceneMacBootScreen";

function App() {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        createSceneManager([
            {
                path: '/intro',
                component: () => <IntroScene />
            },
            {
                path: '/macbook/boot',
                component: () => <SceneMacBootScreen />
            }
        ]);
        setIsInitialized(true);
    }, []);

    if (!isInitialized) {
        return null; // 또는 로딩 인디케이터를 표시할 수 있습니다
    }

    return (
        <>
            <SceneRenderer initialScene={'/macbook/boot'} />
        </>
    )
}

export default App
