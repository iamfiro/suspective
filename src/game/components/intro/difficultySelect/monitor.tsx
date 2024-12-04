import { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { MeshWithMaterial } from "../../../../type/mesh.ts";

const Monitor = () => {
    const { scene } = useGLTF('/src/game/model/glb/lg_monitor.glb');
    const [hovered, setHovered] = useState(false);

	useEffect(() => {
        // cursor 스타일 변경
        document.body.style.cursor = hovered ? 'pointer' : 'auto';

        // cleanup function
        return () => {
            document.body.style.cursor = 'auto';
        };
    }, [hovered]);

    useEffect(() => {
        scene.traverse((node: MeshWithMaterial) => {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
                if (node.material) {
                    (node.material as THREE.MeshStandardMaterial).roughness = 0.7;
                    (node.material as THREE.MeshStandardMaterial).metalness = 0.3;
                    (node.material as THREE.MeshStandardMaterial).envMapIntensity = 1;
                    // hover 시 발광 효과
                    (node.material as THREE.MeshStandardMaterial).emissive = new THREE.Color(hovered ? "#424242" : 0x000000);
                    (node.material as THREE.MeshStandardMaterial).emissiveIntensity = hovered ? 0.5 : 0;
                }
            }
        });
    }, [scene, hovered]);

    return (
        <primitive
            object={scene}
            position={[0.4, -0.9, 0.9]}
            rotation={[0.1, 0, 0]}
            scale={3.3}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        />
    );
}

export default Monitor;