import { create } from "zustand";

type TopBarProgresStore = {
	status: "OPEN" | "CLOSE" | "FINISH";
	onOpen: () => void;
	onClose: () => void;
	onFinish: () => void;
};

export const useTopBarProgres = create<TopBarProgresStore>((set) => ({
	status: "FINISH",
	onOpen: () => set({ status: "OPEN" }),
	onClose: () => set({ status: "CLOSE" }),
	onFinish: () => set({ status: "FINISH" }),
}));
