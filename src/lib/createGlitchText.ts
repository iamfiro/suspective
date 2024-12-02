interface GlitchOptions {
	text: string;
	interval?: number;
	glitchChance?: number;
	customGlitchChars?: string;
	onUpdate?: (text: string) => void;  // 콜백 추가
}

interface GlitchTextElement {
	displayText: string;
	stop: () => void;
	updateText: (newText: string) => void;
}

export function createGlitchText({
	                          text,
	                          interval = 50,
	                          glitchChance = 0.3,
	                          customGlitchChars = '₩@#$%&*:<>¥£︎',
	                          onUpdate
                          }: GlitchOptions): GlitchTextElement {
	let currentText = text;
	let intervalId: number | null = null;
	let isRunning = false;

	const generateGlitchChar = (): string => {
		const randomIndex = Math.floor(Math.random() * customGlitchChars.length);
		return customGlitchChars[randomIndex];
	};

	const applyGlitchEffect = (): string => {
		return Array.from(currentText)
			.map(char => Math.random() < glitchChance ? generateGlitchChar() : char)
			.join('');
	};

	const start = (): void => {
		if (isRunning) return;

		isRunning = true;
		intervalId = window.setInterval(() => {
			const glitchedText = applyGlitchEffect();
			if (onUpdate) {  // 옵셔널 체이닝으로 수정
				onUpdate(glitchedText);
			}
		}, interval);
	};

	const stop = (): void => {
		if (intervalId !== null) {
			window.clearInterval(intervalId);
			intervalId = null;
		}
		isRunning = false;
	};

	const updateText = (newText: string): void => {
		currentText = newText;
	};

	start();

	return {
		displayText: currentText,
		stop,
		updateText
	};
}