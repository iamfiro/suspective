import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {LightController} from "../../engine/lightEffect.ts";

import Logo from '../../../public/images/logo.svg';
import style from '../../styles/scene/introScene.module.scss';

const IntroScene: React.FC = () => {
	const mountRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<THREE.Scene | null>(null);
	const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
	const composerRef = useRef<EffectComposer | null>(null);
	const controlsRef = useRef<OrbitControls | null>(null);
	const frameIdRef = useRef<number>(0);
	const chandelierLightRef = useRef<THREE.SpotLight | null>(null);
	const guiRef = useRef<GUI | null>(null);
	const clipboardRef = useRef<THREE.Object3D | null>(null);

	useEffect(() => {
		if (!mountRef.current) return;

		const initScene = (): void => {
			if (!mountRef.current) return;

			// Scene Setup
			const scene = new THREE.Scene();
			scene.background = new THREE.Color(0xCCCCCC);
			sceneRef.current = scene;

			// Camera Settings
			const camera = new THREE.PerspectiveCamera(
				75,
				mountRef.current.clientWidth / mountRef.current.clientHeight,
				0.01,
				1000
			);
			camera.position.set(-0.33252059617329155, -0.21346472699763547, -0.32073297082428937);
			camera.rotation.set(-1.5845833337978785, 0.0004704648408449537, 3.1074842667528846);
			camera.rotation.x = -1.5845833337978785;
			camera.rotation.y = 0.0004704648408449537;
			camera.rotation.z = 3.1074842667528846;

			// 위치 설정
			camera.position.set(-0.33252059617329155, -0.21346472699763547, -0.32073297082428937);

// controls 설정 전에 카메라가 바라볼 지점 계산
// 현재 rotation 값을 기반으로 바라볼 지점 계산
			const distance = 1; // 적절한 거리 설정
			const euler = new THREE.Euler(
				-1.5845833337978785,
				0.0004704648408449537,
				3.1074842667528846
			);
			const direction = new THREE.Vector3(0, 0, -distance);
			direction.applyEuler(euler);

			const targetPosition = new THREE.Vector3();
			targetPosition.copy(camera.position).add(direction);

// 카메라가 해당 지점을 바라보도록 설정
			camera.lookAt(targetPosition);

			cameraRef.current = camera;

			// Renderer
			const renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true
			});
			renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFSoftShadowMap;
			renderer.outputColorSpace = THREE.SRGBColorSpace;
			renderer.toneMapping = THREE.ACESFilmicToneMapping;
			renderer.toneMappingExposure = 1.5;
			mountRef.current.appendChild(renderer.domElement);
			rendererRef.current = renderer;

			// Enhanced Lighting Setup
			const ambientLight = new THREE.AmbientLight(0xffffff, 1);
			scene.add(ambientLight);

			const mainLight = new THREE.DirectionalLight(0xffffff, 30);
			mainLight.position.set(5, 5, 5);
			mainLight.castShadow = true;
			mainLight.shadow.mapSize.width = 2048;
			mainLight.shadow.mapSize.height = 2048;
			scene.add(mainLight);

			const pointLight1 = new THREE.PointLight(0xffffff, 2);
			pointLight1.position.set(0, 3, 0);
			scene.add(pointLight1);

			const pointLight2 = new THREE.PointLight(0xff9900, 1);
			pointLight2.position.set(-3, 2, -3);
			scene.add(pointLight2);

			const pointLight3 = new THREE.PointLight(0xff9900, 1);
			pointLight3.position.set(3, 2, 3);
			scene.add(pointLight3);

			// Post Processing
			const composer = new EffectComposer(renderer);
			const renderPass = new RenderPass(scene, camera);
			composer.addPass(renderPass);

			const chandelierLight = new THREE.PointLight("#ffd7be", 12);
			chandelierLight.position.set(0, 2.5, 0);
			scene.add(chandelierLight);

			// Chandelier SpotLight
			const spotlight = new THREE.SpotLight("#ffffff", 15);
			spotlight.position.set(0, 1, 0);
			spotlight.angle = Math.PI / 8;
			spotlight.penumbra = 0.1;
			spotlight.decay = 1.5;
			spotlight.distance = 5;
			chandelierLightRef.current = spotlight;

			spotlight.castShadow = true;
			spotlight.shadow.mapSize.width = 4096;
			spotlight.shadow.mapSize.height = 4096;
			spotlight.shadow.camera.near = 0.5;
			spotlight.shadow.camera.far = 15;
			spotlight.shadow.focus = 1;
			spotlight.shadow.bias = -0.0001;

			scene.add(spotlight);

			// SSAO Setup
			const ssaoPass = new SSAOPass(scene, camera, window.innerWidth, window.innerHeight);
			ssaoPass.kernelRadius = 16;
			ssaoPass.minDistance = 0.005;
			ssaoPass.maxDistance = 0.1;
			composer.addPass(ssaoPass);

			// Bloom Setup
			const bloomPass = new UnrealBloomPass(
				new THREE.Vector2(window.innerWidth, window.innerHeight),
				0.1,
				0.4,
				0.85
			);
			composer.addPass(bloomPass);

			composerRef.current = composer;

			// Controls
			const controls = new OrbitControls(camera, renderer.domElement);
			controls.enableDamping = true;
			controls.dampingFactor = 0.05;
			controls.target.set(0, 0, 0);
			controlsRef.current = controls;
		};

		const loadModel = (): void => {
			const loader = new GLTFLoader();

			// Room Model Load
			loader.load(
				'/src/game/model/glb/detective_room.glb',
				(gltf: GLTF) => {
					if (!sceneRef.current) return;

					const model = gltf.scene;

					model.traverse((node) => {
						if (node instanceof THREE.Mesh) {
							node.castShadow = true;
							node.receiveShadow = true;

							if (node.material) {
								node.material.roughness = 0.7;
								node.material.metalness = 0.3;
								node.material.envMapIntensity = 1;
							}
						}
					});

					const box = new THREE.Box3().setFromObject(model);
					const center = box.getCenter(new THREE.Vector3());
					const size = box.getSize(new THREE.Vector3());

					const maxDim = Math.max(size.x, size.y, size.z);
					const scale = 3 / maxDim;
					model.scale.multiplyScalar(scale);

					model.position.x = -center.x * scale;
					model.position.y = -center.y * scale;
					model.position.z = -center.z * scale;

					sceneRef.current.add(model);
				},
				(xhr: ProgressEvent) => {
					console.log(`Loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
				},
				(error: unknown) => {
					console.error('Error loading model:', error);
				}
			);

			// Clipboard Model Load
			loader.load(
				'/src/game/model/glb/clipboard.glb',
				(gltf: GLTF) => {
					if (!sceneRef.current) return;

					const model = gltf.scene;

					model.traverse((node) => {
						if (node instanceof THREE.Mesh) {
							node.castShadow = true;
							node.receiveShadow = true;

							if (node.material) {
								node.material.roughness = 0.7;
								node.material.metalness = 0.3;
								node.material.envMapIntensity = 1;
							}
						}
					});

					const box = new THREE.Box3().setFromObject(model);
					const size = box.getSize(new THREE.Vector3());

					const maxDim = Math.max(size.x, size.y, size.z);
					const scale = 0.3 / maxDim;
					model.scale.multiplyScalar(scale);

					model.position.x = -.35;
					model.position.y = -.52;
					model.position.z = -.34;

					model.rotation.y = 60;

					sceneRef.current.add(model);
				},
			);
		};

		const animate = (): void => {
			frameIdRef.current = requestAnimationFrame(animate);

			if (controlsRef.current) {
				controlsRef.current.update();
			}

			if (composerRef.current && sceneRef.current && cameraRef.current) {
				composerRef.current.render();
			}
		};

		const handleResize = (): void => {
			if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;

			const width = mountRef.current.clientWidth;
			const height = mountRef.current.clientHeight;

			cameraRef.current.aspect = width / height;
			cameraRef.current.updateProjectionMatrix();

			rendererRef.current.setSize(width, height);

			if (composerRef.current) {
				composerRef.current.setSize(width, height);
			}
		};

		const chandlerLightUpdate = (): void => {
			if (!sceneRef.current || !chandelierLightRef.current) return;

			const lightController = new LightController(chandelierLightRef);
			lightController.playPattern('flicker');
		}

		initScene();
		loadModel();
		animate();

		setInterval(() => {
			chandlerLightUpdate();
		}, 3400);

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(frameIdRef.current);

			if (rendererRef.current && mountRef.current) {
				mountRef.current.removeChild(rendererRef.current.domElement);
				rendererRef.current.dispose();
			}

			if (controlsRef.current) {
				controlsRef.current.dispose();
			}

			if (guiRef.current) {
				guiRef.current.destroy();
			}
		};
	}, []);

	return (
		<>
			<div
				ref={mountRef}
				style={{
					width: '100vw',
					height: '100vh',
				}}
			/>
			<img src={Logo} className={style.logo}/>
		</>
	);
};

export default IntroScene;