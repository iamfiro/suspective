import { ReactNode, useState, useEffect, useCallback, useRef } from 'react';
import style from './style.module.scss';
import {Position, Size, useMacPrograms} from "../../../../states/useMacPrograms.ts";

interface MacProgramProps {
    id: string;
    title: string;
    icon?: string;
    children: ReactNode;
}

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | null;

export const MacProgram = ({
                               id,
                               children
                           }: MacProgramProps) => {
    const programRef = useRef<HTMLDivElement>(null);
    const program = useMacPrograms(state =>
        state.programs.find(p => p.id === id)
    );
    const { setPosition, setSize, setActive, toggleFullScreen, toggleMinimize, removeProgram, deactivateAll } = useMacPrograms();

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
    const [resizeDirection, setResizeDirection] = useState<ResizeDirection>(null);
    const [initialSize, setInitialSize] = useState<Size | null>(null);
    const [initialPosition, setInitialPosition] = useState<Position | null>(null);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!program || program.isFullScreen) return;

        // 컨트롤 버튼 클릭시 드래그 방지
        if ((e.target as HTMLElement).closest(`.${style.controls}`)) return;

        setIsDragging(true);
        setDragOffset({
            x: e.clientX - program.position.x,
            y: e.clientY - program.position.y
        });

        setActive(id);
    }, [program, id, setActive]);

    const handleResizeStart = useCallback((e: React.MouseEvent<HTMLDivElement>, direction: ResizeDirection) => {
        if (!program || program.isFullScreen || !program.isResizable) return;

        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        setResizeDirection(direction);
        setInitialSize(program.size);
        setInitialPosition(program.position);
        setActive(id);
    }, [program, id, setActive]);

    // 드래그 이벤트 처리
    useEffect(() => {
        if (!isDragging || !program) return;

        const handleMouseMove = (e: MouseEvent) => {
            // 상단 30px, 하단 60px 제한
            const newY = Math.min(
                Math.max(30, e.clientY - dragOffset.y),
                window.innerHeight - 60 - program.size.height
            );

            setPosition(id, {
                x: e.clientX - dragOffset.x,
                y: newY
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset, id, program, setPosition]);

    // 리사이즈 이벤트 처리
    useEffect(() => {
        if (!isResizing || !program || !initialSize || !initialPosition || !resizeDirection) return;

        const handleResize = (e: MouseEvent) => {
            const newSize = { ...initialSize };
            const newPosition = { ...initialPosition };

            if (resizeDirection.includes('n') || resizeDirection.includes('s')) {
                let newHeight = initialSize.height;
                let newY = initialPosition.y;

                if (resizeDirection.includes('n')) {
                    const deltaY = e.clientY - initialPosition.y;
                    newHeight = Math.max(200, initialSize.height - deltaY);
                    newY = Math.max(30, Math.min(
                        initialPosition.y + deltaY,
                        window.innerHeight - 60 - 200 // 최소 높이 200px 보장
                    ));
                } else if (resizeDirection.includes('s')) {
                    const deltaY = e.clientY - (initialPosition.y + initialSize.height);
                    newHeight = Math.max(200, Math.min(
                        initialSize.height + deltaY,
                        window.innerHeight - 60 - initialPosition.y
                    ));
                }

                newSize.height = newHeight;
                newPosition.y = newY;
            }

            if (resizeDirection.includes('e') || resizeDirection.includes('w')) {
                let newWidth = initialSize.width;
                let newX = initialPosition.x;

                if (resizeDirection.includes('w')) {
                    const deltaX = e.clientX - initialPosition.x;
                    newWidth = Math.max(320, initialSize.width - deltaX);
                    newX = initialPosition.x + initialSize.width - newWidth;
                } else if (resizeDirection.includes('e')) {
                    const deltaX = e.clientX - (initialPosition.x + initialSize.width);
                    newWidth = Math.max(320, initialSize.width + deltaX);
                }

                newSize.width = newWidth;
                newPosition.x = newX;
            }

            // 대각선 리사이즈일 때도 작동하도록 위치와 크기를 동시에 업데이트
            setSize(id, newSize);
            setPosition(id, newPosition);
        };

        const handleResizeEnd = () => {
            setIsResizing(false);
            setResizeDirection(null);
            setInitialSize(null);
            setInitialPosition(null);
        };

        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', handleResizeEnd);

        return () => {
            document.removeEventListener('mousemove', handleResize);
            document.removeEventListener('mouseup', handleResizeEnd);
        };
    }, [isResizing, program, initialSize, initialPosition, resizeDirection, id, setSize, setPosition]);

    // 프로그램 창 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // isDragging이 true일 때는 실행하지 않음
            if (isDragging) return;

            // 클릭된 요소가 현재 프로그램인지 먼저 확인
            const targetElement = e.target as HTMLElement;
            const isClickInsideProgram = targetElement.closest(`.${style.program}`);

            // 프로그램 외부를 클릭했을 때만 deactivateAll 호출
            if (!isClickInsideProgram) {
                deactivateAll();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [deactivateAll, isDragging]);

    if (!program || program.isMinimized) return null;

    return (
        <div
            ref={programRef}
            className={`${style.program} ${program.isActive ? style.active : ''} ${program.isFullScreen ? style.fullScreen : ''}`}
            style={{
                top: program.isFullScreen ? '0' : `${program.position.y}px`,
                left: program.isFullScreen ? '0' : `${program.position.x}px`,
                width: program.isFullScreen ? '100%' : program.size.width,
                height: program.isFullScreen ? '100%' : program.size.height,
                cursor: isDragging ? 'grabbing' : 'default',
                zIndex: program.zIndex
            }}
            onMouseDown={() => {
                setActive(id);
            }}
        >
            <header
                className={style.titleBar}
                onMouseDown={handleMouseDown}
            >
                <div className={style.controls}>
                    <button
                        className={`${style.control} ${style.close}`}
                        onClick={() => removeProgram(id)}
                    />
                    <button
                        className={`${style.control} ${style.minimize}`}
                        onClick={() => toggleMinimize(id)}
                    />
                    <button
                        className={`${style.control} ${style.fullscreen}`}
                        onClick={() => toggleFullScreen(id)}
                    />
                </div>
            </header>
            <main className={style.content}>
                {children}
            </main>

            {program.isResizable && !program.isFullScreen && (
                <>
                    <div className={`${style.resizeHandle} ${style.n}`} onMouseDown={(e) => handleResizeStart(e, 'n')} />
                    <div className={`${style.resizeHandle} ${style.s}`} onMouseDown={(e) => handleResizeStart(e, 's')} />
                    <div className={`${style.resizeHandle} ${style.e}`} onMouseDown={(e) => handleResizeStart(e, 'e')} />
                    <div className={`${style.resizeHandle} ${style.w}`} onMouseDown={(e) => handleResizeStart(e, 'w')} />
                    <div className={`${style.resizeHandle} ${style.ne}`} onMouseDown={(e) => handleResizeStart(e, 'ne')} />
                    <div className={`${style.resizeHandle} ${style.nw}`} onMouseDown={(e) => handleResizeStart(e, 'nw')} />
                    <div className={`${style.resizeHandle} ${style.se}`} onMouseDown={(e) => handleResizeStart(e, 'se')} />
                    <div className={`${style.resizeHandle} ${style.sw}`} onMouseDown={(e) => handleResizeStart(e, 'sw')} />
                </>
            )}
        </div>
    );
};

export default MacProgram;