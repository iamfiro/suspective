import IntroScene from "./game/scene/intro/introScene";
import {useEffect, useState} from "react";
import {createSceneManager, SceneRenderer} from "./engine/scene/sceneManager.tsx";
import FictionDisclaimer from "./game/scene/intro/fictionDisclaimer.tsx";
import WelcomeToStation from "./game/scene/intro/welcomeToStation.tsx";
import IntranetBoot from "./game/scene/intranet/boot.tsx";
import IntranetBootOS from "./game/scene/intranet/bootOS.tsx";
import BootProgram from "./game/scene/intranet/bootProgram.tsx";
import IntranetLogin from "./game/scene/intranet/login.tsx";
import DifficultySelect from "./game/scene/intranet/DifficultySelect.tsx";
import MissionList from "./game/scene/intranet/missionList.tsx";

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
            }
        ]);
        setIsInitialized(true);
    }, []);

    if (!isInitialized) {
        return null; // 또는 로딩 인디케이터를 표시할 수 있습니다
    }

    return (
        <>
            <SceneRenderer initialScene={'/missionList'} />
        </>
    )
}

export default App
