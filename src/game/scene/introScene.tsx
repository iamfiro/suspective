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
import {gsap} from "gsap";
import SoundManager from "../../engine/sound/soundManager.ts";
import {CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader.js";

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
	const logoRef = useRef<HTMLImageElement | null>(null);
	const labelRendererRef = useRef<CSS2DRenderer | null>(null);

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

			// 위치 설정 - 딱 클립보드 ㅋㅋ
			// camera.position.set(-0.33252059617329155, -0.224, -0.345);

			camera.position.set(0.8, 0.7, 0.9);

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
			camera.rotation.set(Math.PI / 2, 0, 0);

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
				0,
				0.4,
				0.85
			);
			composer.addPass(bloomPass);

			composerRef.current = composer;

			// Controls
			const controls = new OrbitControls(camera, renderer.domElement);
			controls.enableDamping = true;
			controls.dampingFactor = 0.05;
			// 딱 클립보드 ㅋㅋ
			// controls.target.set(0, -100, 10);
			controls.target.set(0, 0, 0)
			controlsRef.current = controls;

			camera.rotation.set(
				Math.PI / -2, 0, 0
			)
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

		const add3DText = () => {
			if (!sceneRef.current) return;

			const loader = new FontLoader();
			loader.load('/fonts/NotoSans.json', (font) => {
				const color = 0x000000;
				const matLite = new THREE.MeshBasicMaterial({
					color: color,
					transparent: true,
					opacity: 0.95,
					side: THREE.DoubleSide
				});

				const message = `[ SUSPECTIVE ] Fiction Disclaimer\n
All characters, events, locations, and situations appearing in this game are entirely fictional. 
Any resemblance to real persons, living or dead, or actual events is purely coincidental and unintentional.
The crimes, incidents, and investigation processes depicted in this game are constructed solely for dramatic effect and gameplay purposes, and may differ from actual investigative or legal procedures.
While the game may contain portrayals of specific professions, organizations, regions, or institutions, these are purely works of fiction and bear no connection to their real-world counterparts.
This game is created for entertainment purposes only and should not be used as educational material or legal reference.`;

				// 텍스트 줄바꿈을 위한 함수
				const wrapText = (text: string, maxWidth: number) => {
					const words = text.split(' ');
					const lines = [];
					let currentLine = '';

					words.forEach(word => {
						// 임시로 단어를 추가해봄
						const testLine = currentLine ? `${currentLine} ${word}` : word;
						// 테스트용 geometry를 만들어서 너비 체크
						const testShapes = font.generateShapes(testLine, 0.05);
						const testGeometry = new THREE.ShapeGeometry(testShapes);
						testGeometry.computeBoundingBox();

						const lineWidth = testGeometry.boundingBox ?
							testGeometry.boundingBox.max.x - testGeometry.boundingBox.min.x : 0;

						if (lineWidth > maxWidth && currentLine) {
							lines.push(currentLine);
							currentLine = word;
						} else {
							currentLine = testLine;
						}
					});

					if (currentLine) {
						lines.push(currentLine);
					}

					return lines.join('\n');
				};

				// 원하는 최대 너비 설정 (Three.js 단위)
				const maxWidth = 1.5;
				const wrappedMessage = wrapText(message, maxWidth);

				const shapes = font.generateShapes(wrappedMessage, 0.05);
				const geometry = new THREE.ShapeGeometry(shapes);
				geometry.computeBoundingBox();

				if(geometry.boundingBox && sceneRef.current) {
					const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
					geometry.translate(xMid, 0, 0);

					const text = new THREE.Mesh(geometry, matLite);
					text.scale.set(0.095, 0.095, 0.095);
					text.position.set(-0.32, -0.51, -0.24);
					text.rotation.x = -Math.PI / 2;
					text.rotation.z = Math.PI / -1.1;

					sceneRef.current.add(text);
				}
			});
		};

		const animate = (): void => {
			frameIdRef.current = requestAnimationFrame(animate);

			if (controlsRef.current) {
				controlsRef.current.update();
			}

			if (composerRef.current && sceneRef.current && cameraRef.current) {
				composerRef.current.render();

				// CSS2D 렌더러 업데이트 추가
				if (labelRendererRef.current) {
					labelRendererRef.current.render(sceneRef.current, cameraRef.current);
				}
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

			if (labelRendererRef.current) {
				labelRendererRef.current.setSize(width, height);
			}
		};

		const chandlerLightUpdate = (): void => {
			if (!sceneRef.current || !chandelierLightRef.current) return;

			const lightController = new LightController(chandelierLightRef);
			lightController.playPattern('flicker');
		}

		const cameraAnimateToClipboard = () => {
			playBGM()
			if(cameraRef.current && controlsRef.current && logoRef.current) {
				gsap.to(logoRef.current, {
					opacity: 0,
					duration: 1
				})
				gsap.to(cameraRef.current.position, {
					x: -0.33252059617329155,
					y: -0.294,
					z: -0.375,
					ease: 'power3.inOut',
					duration: 4
				});

				gsap.to(controlsRef.current.target, {
					x: 0,
					y: -100,
					z: 10,
					ease: 'power4.inOut',
					duration: 12
				});
			}
		}

		const playBGM = () => {
			const soundManer = SoundManager.getInstance();

			soundManer.loadSound('bgm', '/public/sounds/intro-daru.mp3');
			soundManer.playBGM('bgm');
			soundManer.setMusicVolume(0.1)
		}

		initScene();
		add3DText();
		loadModel();
		animate();
		setInterval(() => {
			chandlerLightUpdate();
		}, 3400);

		window.addEventListener('resize', handleResize);

		window.addEventListener('click', cameraAnimateToClipboard);

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

			if (labelRendererRef.current && mountRef.current) {
				mountRef.current.removeChild(labelRendererRef.current.domElement);
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
			<img ref={logoRef} src={Logo} className={style.logo}/>
		</>
	);
};

export default IntroScene;