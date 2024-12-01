import { create } from 'zustand';

export interface Position {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export interface MacProgram {
    id: string;
    title: string;
    icon?: string;
    position: Position;
    size: Size;
    prevState: {
        position: Position;
        size: Size;
    } | null;
    isActive: boolean;
    isFullScreen: boolean;
    isMinimized: boolean;
    isResizable: boolean;
    zIndex: number;
}

interface MacProgramState {
    programs: MacProgram[];
    activeId: string | null;
    maxZIndex: number;
    addProgram: (program: Omit<MacProgram, 'zIndex' | 'isActive' | 'prevState'>) => void;
    removeProgram: (id: string) => void;
    setPosition: (id: string, position: Position) => void;
    setSize: (id: string, size: Size) => void;
    setActive: (id: string) => void;
    deactivateAll: () => void;
    toggleFullScreen: (id: string) => void;
    toggleMinimize: (id: string) => void;
}

export const useMacPrograms = create<MacProgramState>((set) => ({
    programs: [],
    activeId: null,
    maxZIndex: 100,

    addProgram: (program) => set((state) => {
        // 이미 존재하는 프로그램인지 확인
        const existingProgram = state.programs.find(p => p.id === program.id);

        if (existingProgram) {
            // 이미 존재하는 경우, 최소화 상태만 해제하고 활성화
            const newZIndex = state.maxZIndex + 1;
            return {
                programs: state.programs.map(p => ({
                    ...p,
                    isActive: p.id === program.id,
                    isMinimized: p.id === program.id ? false : p.isMinimized,
                    zIndex: p.id === program.id ? newZIndex : p.zIndex
                })),
                activeId: program.id,
                maxZIndex: newZIndex
            };
        }

        // 새로운 프로그램인 경우, 기존 로직대로 추가
        const updatedPrograms = state.programs.map(p => ({
            ...p,
            isActive: false
        }));

        return {
            programs: [
                ...updatedPrograms,
                {
                    ...program,
                    prevState: null,
                    isActive: true,
                    zIndex: state.maxZIndex + 1
                }
            ],
            activeId: program.id,
            maxZIndex: state.maxZIndex + 1
        };
    }),

    removeProgram: (id) => set((state) => ({
        programs: state.programs.filter(p => p.id !== id),
        activeId: state.activeId === id ? null : state.activeId
    })),

    setPosition: (id, position) => set((state) => ({
        programs: state.programs.map(p =>
            p.id === id ? { ...p, position } : p
        )
    })),

    setSize: (id, size) => set((state) => ({
        programs: state.programs.map(p =>
            p.id === id ? { ...p, size } : p
        ),
        activeId: state.activeId === id ? id : state.activeId
    })),

    setActive: (id) => set((state) => {
        const newZIndex = state.maxZIndex + 1;
        return {
            programs: state.programs.map(p => ({
                ...p,
                isActive: p.id === id,
                zIndex: p.id === id ? newZIndex : p.zIndex
            })),
            activeId: id,
            maxZIndex: newZIndex
        };
    }),

    deactivateAll: () => set((state) => ({
        programs: state.programs.map(p => ({
            ...p,
            isActive: false
        })),
        activeId: null
    })),

    toggleFullScreen: (id) => set((state) => ({
        programs: state.programs.map(p => {
            if (p.id !== id) return p;

            if (p.isFullScreen) {
                return {
                    ...p,
                    isFullScreen: false,
                    position: p.prevState?.position || p.position,
                    size: p.prevState?.size || p.size,
                    prevState: null
                };
            } else {
                return {
                    ...p,
                    isFullScreen: true,
                    prevState: {
                        position: p.position,
                        size: p.size
                    }
                };
            }
        })
    })),

    toggleMinimize: (id) => set((state) => ({
        programs: state.programs.map(p =>
            p.id === id ? { ...p, isMinimized: !p.isMinimized } : p
        )
    }))
}));