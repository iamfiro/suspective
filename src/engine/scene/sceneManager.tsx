import { ReactNode, useState, useEffect } from 'react';

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

let sceneNavigator: SceneNavigator | null = null;
let scenes: SceneObject[] = [];
const subscribers: Set<(scene: string) => void> = new Set();

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

            if (scene.preload) {
                scene.preload().then(() => {
                    sceneNavigator!.currentScene = path;
                    sceneNavigator!.sceneHistory.push(path);
                    subscribers.forEach(subscriber => subscriber(path));
                });
            } else {
                sceneNavigator!.currentScene = path;
                sceneNavigator!.sceneHistory.push(path);
                subscribers.forEach(subscriber => subscriber(path));
            }
        },
        back: () => {
            if (sceneNavigator!.sceneHistory.length <= 1) return;

            sceneNavigator!.sceneHistory.pop();
            const previousScene = sceneNavigator!.sceneHistory[sceneNavigator!.sceneHistory.length - 1];
            sceneNavigator!.currentScene = previousScene;
            subscribers.forEach(subscriber => subscriber(previousScene));
        }
    };

    return sceneNavigator;
}

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

export function SceneRenderer({initialScene}: {initialScene: string}) {
    const [currentScenePath, setCurrentScenePath] = useState(initialScene);

    useEffect(() => {
        if (!sceneNavigator) {
            throw new Error('SceneManager not initialized. Call createSceneManager first.');
        }

        const subscriber = (scene: string) => {
            setCurrentScenePath(scene);
        };

        subscribers.add(subscriber);
        return () => {
            subscribers.delete(subscriber);
        };
    }, []);

    const currentScene = findScene(currentScenePath, scenes);

    if (!currentScene) {
        return <div>Scene not found</div>;
    }

    return <>{currentScene.component()}</>;
}

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