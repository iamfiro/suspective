import { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import {
	useGLTF,
	OrbitControls,
} from '@react-three/drei';
import {
	EffectComposer,
	Bloom,
	SSAO
} from '@react-three/postprocessing';
import * as THREE from 'three';
import { gsap } from 'gsap';
import Logo from '../../../../public/images/logo.svg';
import style from '../../../styles/scene/introScene.module.scss';
import SoundManager from "../../../engine/sound/soundManager.ts";
import {folder, useControls} from "leva";
import {CubeTextureLoader} from "three";

interface MeshWithMaterial extends THREE.Object3D {
	material?: THREE.Material;
	geometry?: THREE.BufferGeometry;
}

type orbitControls = typeof OrbitControls;

interface ExtendedOrbitControls extends orbitControls {
	target: THREE.Vector3;
}

// Scene setup and effects
const SceneSetup = ({logoRef}: { logoRef: React.RefObject<HTMLImageElement> }) => {
	const { camera } = useThree();
	const controlsRef = useRef<ExtendedOrbitControls>(null);

	useEffect(() => {
		camera.position.set(-0, -0.4, 2.2);
		camera.rotation.set(0, 0, 0);

		const handleClick = () => {
			const soundManager = SoundManager.getInstance();
			soundManager.loadSound('bgm', '/public/sounds/intro-daru.mp3');
			soundManager.playBGM('bgm');
			soundManager.setMusicVolume(0.1);

			if (logoRef.current) {
				gsap.to(logoRef.current, {
					opacity: 0,
					duration: 1
				});
			}

			gsap.to(camera.position, {
				x: -0,
				y: -0.7,
				z: 1.6,
				ease: 'power3.inOut',
				duration: 4
			});
		};

		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('click', handleClick);
	}, [camera]);

	return (
		<>
			<OrbitControls
				ref={controlsRef}
				enableDamping
				dampingFactor={0.05}
				rotateSpeed={0.5}
				minDistance={1}
				maxDistance={10}
				minPolarAngle={Math.PI / 4}
				maxPolarAngle={Math.PI / 1.5}
			/>
			<EffectComposer enableNormalPass>
				<Bloom
					intensity={0.4}
					luminanceThreshold={0}
					luminanceSmoothing={0.85}
				/>
				<SSAO
					radius={16}
					intensity={20}
					luminanceInfluence={0.5}
					color={new THREE.Color(0x000000)}
				/>
			</EffectComposer>
		</>
	);
};

const PoliceCenter = () => {
	const { scene } = useGLTF('/src/game/model/glb/police_station.glb');

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

		const box = new THREE.Box3().setFromObject(scene);
		const center = box.getCenter(new THREE.Vector3());
		const size = box.getSize(new THREE.Vector3());
		const maxDim = Math.max(size.x, size.y, size.z);
		const scale = 3 / maxDim;

		scene.scale.multiplyScalar(scale);
		scene.position.set(
			-center.x * scale,
			-center.y * scale,
			-center.z * scale
		);
	}, []);

	return <primitive object={scene} />;
}

const PoliceCar = () => {
	const { scene } = useGLTF('/src/game/model/glb/police_car.glb');

	// Add controls for position, rotation, and scale
	const { position, rotation, scale } = useControls({
		'Police Car': folder({
			position: {
				value: { x: -0.8, y: -0.9, z: 1.2 },
				step: 0.1,
			},
			rotation: {
				value: { x: -0.35, y: 1.5, z: 0 },
				step: 0.1,
			},
			scale: {
				value: { x: 0.005, y: 0.0035, z: 0.0045 },
				step: 0.1,
			}
		})
	});

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

		// Apply normalized scale and UI scale
		scene.scale.set(
			scale.x,
			scale.y,
			scale.z
		);

		scene.position.set(
			position.x,
			position.y,
			position.z
		)

		scene.rotation.set(
			rotation.x,
			rotation.y,
			rotation.z
		);
	}, [scene, position, rotation, scale]);

	return <primitive object={scene} />;
}

const LeftBuilding = () => {
	const { scene } = useGLTF('/src/game/model/glb/building.glb');

	// Add controls for position, rotation, and scale
	const { position, rotation, scale } = useControls({
		'Left Building': folder({
			position: {
				value: { x: -0.9, y: -1.4, z: 1.0 },
				step: 0.1,
			},
			rotation: {
				value: { x: 0, y: -4.6, z: 0 },
				step: 0.1,
			},
			scale: {
				value: { x: 0.1, y: 0.2, z: 0.2 },
				step: 0.1,
			}
		})
	});

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

		// Apply normalized scale and UI scale
		scene.scale.set(
			scale.x,
			scale.y,
			scale.z
		);

		scene.position.set(
			position.x,
			position.y,
			position.z
		)

		scene.rotation.set(
			rotation.x,
			rotation.y,
			rotation.z
		);
	}, [scene, position, rotation, scale]);

	return <primitive object={scene} />;
}

const DirectionalLightControls = () => {
	const { position, intensity } = useControls({
		'Directional Light': folder({
			position: {
				value: { x: 0.5, y: 2, z: 5.5 },
				step: 0.1,
			},
			intensity: {
				value: 3.8,
				min: 0,
				max: 20,
				step: 0.1,
			},
		})
	});

	return (
		<directionalLight
			position={[position.x, position.y, position.z]}
			intensity={intensity}
			castShadow
			shadow-mapSize-width={2048}
			shadow-mapSize-height={2048}
		/>
	);
};

const Skybox = () => {
	const { scene } = useThree();

	useEffect(() => {
		const loader = new CubeTextureLoader();
		// Load all 6 sides of the skybox
		const skyboxTexture = loader.load([
			'/src/game/textures/skybox/px.jpg', // right
			'/src/game/textures/skybox/nx.jpg', // left
			'/src/game/textures/skybox/py.jpg', // top
			'/src/game/textures/skybox/ny.jpg', // bottom
			'/src/game/textures/skybox/pz.jpg', // front
			'/src/game/textures/skybox/nz.jpg'  // back
		]);

		scene.background = skyboxTexture;
	}, [scene]);

	return null;
};

// Main component
const IntroScene: React.FC = () => {
	const logoRef = useRef<HTMLImageElement>(null);

	return (
		<>
			<Canvas
				style={{ width: '100vw', height: '100vh' }}
				shadows
				gl={{
					antialias: true,
					alpha: true,
					toneMapping: THREE.ACESFilmicToneMapping,
					toneMappingExposure: 1.5,
					outputColorSpace: THREE.SRGBColorSpace,
				}}
				camera={{ fov: 75, near: 0.01, far: 1000 }}
			>
				<color attach="background" args={[0xCCCCCC]} />

				<ambientLight intensity={1} />
				<DirectionalLightControls />

				<pointLight position={[0, 3, 0]} intensity={2} />
				<pointLight position={[-3, 2, -3]} intensity={1} color="#ff9900" />
				<pointLight position={[3, 2, 3]} intensity={1} color="#ff9900" />

				<SceneSetup logoRef={logoRef} />
				<PoliceCenter />
				<PoliceCar />
				<LeftBuilding />
				<Skybox />
			</Canvas>
			<img ref={logoRef} src={Logo} className={style.logo} alt={'logo'} />
		</>
	);
};

export default IntroScene;