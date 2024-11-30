import {useEffect, useState} from "react";
import {createSceneManager, SceneRenderer} from "./engine/scene/sceneManager.tsx";
import SceneMacBootScreen from "./game/scenes/macbook/bootScreen.tsx";
import {MacLoginScreen} from "./game/scenes/macbook/loginScreen.tsx";

function App() {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        createSceneManager([
            {
                path: '/macbook/boot',
                component: () => <SceneMacBootScreen />
            },
            {
                path: '/macbook/login',
                component: () => <MacLoginScreen />
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
