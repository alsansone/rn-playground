import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

export interface Message {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: number;
}

export type MessageSender = "user" | "bot";

interface MessagesState {
  showOverlay: boolean;
  isExpanded: boolean;
  items: Message[];
}

const initialState: MessagesState = {
  showOverlay: false,
  isExpanded: true,
  items: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    // toggle chat overlay visibility
    toggleOverlay(state) {
      state.showOverlay = !state.showOverlay;
    },
    // toggle chat window size
    toggleSize(state) {
      state.isExpanded = !state.isExpanded;
    },
    // add a new message
    sendMessage: {
      reducer(state, action: PayloadAction<Message>) {
        state.items.push(action.payload);
      },
      prepare(text: string, sender: MessageSender) {
        return {
          payload: {
            id: nanoid(),
            text,
            sender,
            timestamp: Date.now(),
          } as Message,
        };
      },
    },
    // optional: receive a message from server
    receiveMessage(state, action: PayloadAction<Omit<Message, "id">>) {
      const msg: Message = {
        ...action.payload,
        id: nanoid(),
      };
      state.items.push(msg);
    },
    // clear all messages
    clearChat(state) {
      state.items = [];
    },
  },
});

export const {
  toggleOverlay,
  toggleSize,
  sendMessage,
  receiveMessage,
  clearChat,
} = messagesSlice.actions;
export default messagesSlice.reducer;
