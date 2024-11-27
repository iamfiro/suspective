import IntroScene from "./game/scene/intro/introScene";
import {useEffect, useState} from "react";
import {createSceneManager, SceneRenderer} from "./engine/scene/sceneManager.tsx";

function App() {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        createSceneManager([
            {
                path: '/intro',
                component: () => <IntroScene />
            }
        ]);
        setIsInitialized(true);
    }, []);

    if (!isInitialized) {
        return null; // 또는 로딩 인디케이터를 표시할 수 있습니다
    }

    return (
        <>
            <SceneRenderer initialScene={'/intro'} />
        </>
    )
}

export default App
