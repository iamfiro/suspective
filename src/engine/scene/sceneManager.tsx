import { ReactNode } from 'react';

// IntroScene 정의를 위한 타입
type SceneComponent = () => ReactNode;

interface SceneObject {
    path: string;
    component: SceneComponent;
    preload?: () => Promise<void>;
    children?: SceneObject[];
}

interface SceneNavigator {
    currentScene: string;
    navigate: (path: string) => void;
    back: () => void;
    sceneHistory: string[];
}

// IntroScene Manager 인스턴스를 저장할 전역 변수
let sceneNavigator: SceneNavigator | null = null;
let scenes: SceneObject[] = [];

// IntroScene 생성 함수
export function createSceneManager(sceneRoutes: SceneObject[]) {
    scenes = sceneRoutes;

    const initialScene = scenes[0]?.path || '/';

    sceneNavigator = {
        currentScene: initialScene,
        sceneHistory: [initialScene],
        navigate: (path: string) => {
            const scene = findScene(path, scenes);
            if (!scene) {
                console.error(`Scene "${path}" not found`);
                return;
            }

            // Preload if exists
            if (scene.preload) {
                scene.preload().then(() => {
                    sceneNavigator!.currentScene = path;
                    sceneNavigator!.sceneHistory.push(path);
                });
            } else {
                sceneNavigator!.currentScene = path;
                sceneNavigator!.sceneHistory.push(path);
            }
        },
        back: () => {
            if (sceneNavigator!.sceneHistory.length <= 1) return;

            sceneNavigator!.sceneHistory.pop();
            const previousScene = sceneNavigator!.sceneHistory[sceneNavigator!.sceneHistory.length - 1];
            sceneNavigator!.currentScene = previousScene;
        }
    };

    return sceneNavigator;
}

// Scene을 찾는 헬퍼 함수
function findScene(path: string, sceneList: SceneObject[]): SceneObject | null {
    for (const scene of sceneList) {
        if (scene.path === path) return scene;
        if (scene.children) {
            const foundInChildren = findScene(path, scene.children);
            if (foundInChildren) return foundInChildren;
        }
    }
    return null;
}

// IntroScene 렌더러 컴포넌트
export function SceneRenderer({initialScene}: {initialScene: string}) {
    if (!sceneNavigator) {
        throw new Error('SceneManager not initialized. Call createSceneManager first.');
    }

    // 처음 렌더링 되는거라면?
    if (sceneNavigator.currentScene === scenes[0]?.path) {
        const initialSceneObject = findScene(initialScene, scenes);
        if (initialSceneObject) {
            sceneNavigator.currentScene = initialScene;
        } else {
            console.error(`Initial scene "${initialScene}" not found`);
        }
    }

    const currentScene = findScene(sceneNavigator.currentScene, scenes);

    if (!currentScene) {
        return <div>Scene not found</div>;
    }

    return <>{currentScene.component()}</>;
}

// IntroScene Hook
export function useScene() {
    if (!sceneNavigator) {
        throw new Error('SceneManager not initialized. Call createSceneManager first.');
    }

    return {
        currentScene: sceneNavigator.currentScene,
        navigate: sceneNavigator.navigate,
        back: sceneNavigator.back,
        sceneHistory: sceneNavigator.sceneHistory
    };
}