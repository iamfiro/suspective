import {create} from "zustand";

interface BackgroundSelectedIconState {
    selectedName: string;

    setSelectedName: (name: string) => void;
}

const useBackgroundSelectedIcon = create<BackgroundSelectedIconState>((set) => ({
    selectedName: '',

    setSelectedName: (selectedName) => set({selectedName}),
}));

export default useBackgroundSelectedIcon;