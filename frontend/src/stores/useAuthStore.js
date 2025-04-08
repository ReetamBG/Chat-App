import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../configs/axios";

const useAuthStore = create((set) => ({
  user: null,
  isCheckingAuth: true,
  isLoading: false,

  signup: async (formData) => {
    set({ isLoading: true });
    try {
      if (!formData.email || !formData.name || !formData.password) {
        return toast.error("All fields are required");
      }
      if (formData.password.length < 6) {
        return toast.error("Password must be greater than 6 characters");
      }
      const res = await axios.post("/auth/signup", formData);
      set({ user: res.data.user });
      toast.success("Signup successful");
    } catch (error) {
      toast.error(`Something went wrong: ${error.response.data.message}`);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (formData) => {
    set({ isLoading: true });
    try {
      if (!formData.email || !formData.password) {
        return toast.error("All fields are required");
      }
      const res = await axios.post("/auth/login", formData);
      set({ user: res.data.user });
      toast.success("Login successful");
    } catch (error) {
      toast.error(`Something went wrong: ${error.response.data.message}`);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axios.get("/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error(`Something went wrong: ${error.response.data.message}`);
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    try {
      const res = await axios.get("/auth/check-auth");
      set({ user: res.data.user });
    } catch {
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  updateProfile: async (pfp) => {
    set({ isLoading: true });
    try {
      await axios.patch("/auth/update-profile", {
        profilePicture: pfp,
      });

      // update state
      set((state) => ({ user: { ...state.user, profilePicture: pfp } }));
      
      toast.success("Profile picture updated");
    } catch (error) {
      toast.error(`Something went wrong: ${error.response.data.message}`);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
