import {useEffect} from "react";
import {useGLTF} from "@react-three/drei";
import {MeshWithMaterial} from "../../../../type/mesh.ts";
import * as THREE from "three";

const Desk = () => {
	const {scene} = useGLTF('/src/game/model/glb/desk.glb');

	useEffect(() => {
		scene.traverse((node: MeshWithMaterial) => {
			if (node instanceof THREE.Mesh) {
				node.castShadow = true;
				node.receiveShadow = true;
				if (node.material) {
					(node.material as THREE.MeshStandardMaterial).roughness = 0.7;
	                (node.material as THREE.MeshStandardMaterial).metalness = 0.3;
	                (node.material as THREE.MeshStandardMaterial).envMapIntensity = 1;
				}
			}
		});
	}, [scene]);

	return (
		<primitive
			object={scene}
			position={[0.4, -1, 1.2]}
			rotation={[0, -4.7, 0]}
			scale={0.4}
		/>
	);
}

export default Desk;