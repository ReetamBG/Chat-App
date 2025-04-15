import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../configs/axios";
import compressImage from "../utils/imageCompressor";
import useAuthStore from "./useAuthStore";

const useChatStore = create((set, get) => ({
  users: [], // to hold the users in the sidebar
  messages: [], // to hold the messages in the container
  selectedUser: null,
  isLoading: false,
  isSendingMessage: false, // to show loading state on sending message

  getUsers: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("/message/users");
      set({ users: res.data.users });
    } catch (error) {
      toast.error(`Could not fetch users: ${error.response.data.message} `);
    } finally {
      set({ isLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`/message/get-conversation/${userId}`);
      set({ messages: res.data.messages });
      set((state) => ({
        selectedUser: state.users.find((user) => user._id === userId),
      }));
    } catch (error) {
      toast.error(
        `Could not fetch conversation: ${
          error.response?.data.message || error.message
        } `
      );
    } finally {
      set({ isLoading: false });
    }
  },

  sendMessage: async (text, image) => {
    set({ isSendingMessage: true });
    try {
      if (image) {
        image = await compressImage(image, 100);
      }

      const res = await axios.post(
        `/message/send-message/${get().selectedUser._id}`,
        {
          text: text,
          image: image,
        }
      );

      set((state) => ({ messages: [...state.messages, res.data.message] }));
    } catch (error) {
      toast.error(
        `Something went wrong: ${error.response?.data.message || error.message}`
      );
    } finally {
      set({ isSendingMessage: false });
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  subscribeToMessages: () => {
    const { socket } = useAuthStore.getState();
    const { selectedUser } = get();
    if (!selectedUser) return;

    socket.on("newMessage", (newMessage) => {
      // Add incoming message only if it's from the currently selected user.
      // This ensures messages from other users (for other conversations)
      // aren't incorrectly shown in the open chat window.
      if (newMessage.senderId === selectedUser._id) {
        set((state) => ({ messages: [...state.messages, newMessage] }));
      }
    });
  },

  unsubscribeFromMessages: () => {
    const { socket } = useAuthStore.getState();
    socket.off("newMessage");
  },
}));

export default useChatStore;
