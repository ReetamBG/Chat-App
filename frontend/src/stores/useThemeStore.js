import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "light",
  setTheme: (t) => {
    localStorage.setItem("theme", t)
    set({ theme: t });
  },
}));

export default useThemeStore;
