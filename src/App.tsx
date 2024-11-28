import IntroScene from "./game/scene/intro/introScene";
import {useEffect, useState} from "react";
import {createSceneManager, SceneRenderer} from "./engine/scene/sceneManager.tsx";
import FictionDisclaimer from "./game/scene/intro/fictionDisclaimer.tsx";
import WelcomeToStation from "./game/scene/intro/welcomeToStation.tsx";
import DifficultySelect from "./game/scene/intro/difficultySelect.tsx";

function App() {
    const [isInitialized, setIsInitialized] = useState(false);

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
            {
                path: '/difficultySelect',
                component: () => <DifficultySelect />
            }
        ]);
        setIsInitialized(true);
    }, []);

    if (!isInitialized) {
        return null; // 또는 로딩 인디케이터를 표시할 수 있습니다
    }

    return (
        <>
            <SceneRenderer initialScene={'/difficultySelect'} />
        </>
    )
}

export default App
