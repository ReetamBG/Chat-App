import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../configs/axios";
import { io } from "socket.io-client";
import compressImage from "../utils/imageCompressor";

const BASE_URL = import.meta.env.PROD ? "/" : "http://localhost:8000";

const useAuthStore = create((set, get) => ({
  user: null,
  isCheckingAuth: true,
  isLoading: false,
  socket: null,
  onlineUsers: [],

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
      get().connectSocket(); // connect to socket
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
      get().connectSocket(); // connect to socket
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
      get().disconnectSocket();
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
      //connect to socket
      // needed here as well cuz socket disconnects on page refresh so connect again on rerender
      // moreover the user may already be logged in or signed up
      // so we need to connect socket when an authenticated user loads page
      get().connectSocket();
    } catch {
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  updateProfile: async (pfp) => {
    set({ isLoading: true });
    try {
      if (pfp) {
        pfp = await compressImage(pfp, 100);
      }
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

  connectSocket: () => {
    const { user } = get();
    // Only connect if there is a user and socket is not connected otherwise return
    if (!user || get().socket?.connected) return;

    const newSocket = io(BASE_URL, {
      query: {
        userId: user._id,
      },
    });
    newSocket.connect();

    // set socket to listen for the getOnlineUsers event (from backend)
    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) socket.disconnect();
    set({ socket: null });
  },
}));

export default useAuthStore;
