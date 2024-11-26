import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {LightController} from "../../engine/lightEffect.ts";

const IntroScene: React.FC = () => {
	const mountRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<THREE.Scene | null>(null);
	const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
	const composerRef = useRef<EffectComposer | null>(null);
	const controlsRef = useRef<OrbitControls | null>(null);
	const frameIdRef = useRef<number>(0);
	const chandelierLightRef = useRef<THREE.SpotLight | null>(null);

	useEffect(() => {
		if (!mountRef.current) return;

		const initScene = (): void => {
			if (!mountRef.current) return;

			// Scene Setup
			const scene = new THREE.Scene();
			// 배경색 제거
			scene.background = new THREE.Color(0xCCCCCC);
			sceneRef.current = scene;

			// Camera Settings
			const camera = new THREE.PerspectiveCamera(
				75,
				mountRef.current.clientWidth / mountRef.current.clientHeight,
				0.1,
				1000
			);
			camera.position.set(0.9, 0.2, 0.9);  // 카메라 위치 조정
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
			renderer.toneMappingExposure = 1.5;  // 노출 증가
			mountRef.current.appendChild(renderer.domElement);
			rendererRef.current = renderer;

			// Enhanced Lighting Setup
			// 주변광 강화
			const ambientLight = new THREE.AmbientLight(0xffffff, 1);
			scene.add(ambientLight);

			// 메인 디렉셔널 라이트
			const mainLight = new THREE.DirectionalLight(0xffffff, 30);  // 강도 증가
			mainLight.position.set(5, 5, 5);
			mainLight.castShadow = true;
			mainLight.shadow.mapSize.width = 2048;
			mainLight.shadow.mapSize.height = 2048;
			scene.add(mainLight);

			// 추가 포인트 라이트들
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

			// 샹들리에 SpotLight 설정
			const spotlight = new THREE.SpotLight("#ffffff", 15);
			spotlight.position.set(0, 1, 0);
			spotlight.angle = Math.PI / 8;
			spotlight.penumbra = 0.1;
			spotlight.decay = 1.5;
			spotlight.distance = 5;
			chandelierLightRef.current = spotlight;

			// 그림자 설정
			spotlight.castShadow = true;
			spotlight.shadow.mapSize.width = 4096;
			spotlight.shadow.mapSize.height = 4096;
			spotlight.shadow.camera.near = 0.5;
			spotlight.shadow.camera.far = 15;
			spotlight.shadow.focus = 1;
			spotlight.shadow.bias = -0.0001;

			scene.add(spotlight);

			// SSAO 설정
			const ssaoPass = new SSAOPass(scene, camera, window.innerWidth, window.innerHeight);
			ssaoPass.kernelRadius = 16;
			ssaoPass.minDistance = 0.005;
			ssaoPass.maxDistance = 0.1;
			composer.addPass(ssaoPass);

			// 블룸 효과 조정
			const bloomPass = new UnrealBloomPass(
				new THREE.Vector2(window.innerWidth, window.innerHeight),
				0.7,    // 강도 증가
				0.4,    // 반경
				0.85    // 임계값
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

			loader.load(
				'/src/game/model/glb/detective_room.glb',
				(gltf: GLTF) => {
					if (!sceneRef.current) return;

					const model = gltf.scene;

					// 모델 머테리얼 향상
					model.traverse((node) => {
						if (node instanceof THREE.Mesh) {
							node.castShadow = true;
							node.receiveShadow = true;

							if (node.material) {
								// 기본 머테리얼 속성 조정
								node.material.roughness = 0.7;
								node.material.metalness = 0.3;
								node.material.envMapIntensity = 1;
							}
						}
					});

					// 모델 스케일 및 위치 조정
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
		};

		const animate = (): void => {
			frameIdRef.current = requestAnimationFrame(animate);

			if (controlsRef.current) {
				controlsRef.current.update();
			}

			// Composer 대신 일반 렌더러 사용
			if (rendererRef.current && sceneRef.current && cameraRef.current) {
				rendererRef.current.render(sceneRef.current, cameraRef.current);
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
		}, 3400)

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
		};
	}, []);

	return (
		<div
			ref={mountRef}
			style={{
				width: '100vw',
				height: '100vh',
			}}
		/>
	);
};

export default IntroScene;