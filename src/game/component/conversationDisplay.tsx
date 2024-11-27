import { useEffect, useState } from 'react';
import SoundManager from "../../engine/sound/soundManager.ts";

interface ConversationItem {
    character: 'boss' | 'me';
    text: string;
    audioPath: string;
    duraction: number;
}

interface ConversationDisplayProps {
    conversation: ConversationItem[];
    onComplete?: () => void;
    className?: string;
    characterNameMap?: Record<string, string>;
}

const ConversationDisplay = ({
                                 conversation,
                                 onComplete,
                                 className = '',
                                 characterNameMap = { boss: '상사', me: '나' }
                             }: ConversationDisplayProps) => {
    const soundManager = SoundManager.getInstance();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [subtitle, setSubtitle] = useState<string>('');

    useEffect(() => {
        if (currentIndex >= conversation.length) {
            onComplete?.();
            return;
        }

        const currentConv = conversation[currentIndex];

        console.log('asd')
        setSubtitle(`${currentConv.text}`);
        soundManager.loadSound('voice', currentConv.audioPath);
        soundManager.setMusicVolume(0.5);
        soundManager.playSFX('voice');

        const timer = setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
        }, currentConv.duraction * 1000);

        return () => clearTimeout(timer);
    }, [currentIndex, conversation, onComplete, characterNameMap]);

    return <span className={className}>{subtitle}</span>;
};

export default ConversationDisplay;