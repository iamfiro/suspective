import {useEffect} from "react";
import {useGLTF} from "@react-three/drei";
import {MeshWithMaterial} from "../../../../type/mesh.ts";
import * as THREE from "three";

const Desk = () => {
	const {scene} = useGLTF('/src/game/model/glb/office_desk.glb');

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

		scene.scale.set(3.4, 3.4, 3.4);
		scene.position.set(
			0.4,
			-4.3,
			0.9
		);
	}, []);

	return (
		<primitive
			object={scene}
			position={[0.4, -4.3, 0.9]}
			rotation={[0, 0, 0]}
			scale={2.3}
		/>
	);
}

export default Desk;