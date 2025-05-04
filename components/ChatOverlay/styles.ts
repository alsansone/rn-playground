import { StyleSheet } from "react-native";

export default StyleSheet.create({
  morphContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    zIndex: 999,
  },
  chatContent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bubbleTouch: {
    backgroundColor: "#007AFF",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  bubbleText: {
    color: "#fff",
    fontWeight: "bold",
  },
  chatHeaderContainer: {
    height: 60,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  chatHeaderIcon: {
    width: 32,
    alignItems: "center",
  },
  chatHeaderTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "left",
    marginStart: 16,
    flex: 1,
  },
  minimizeText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  chatInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f7f7f7",
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingRight: 8,
    color: "#000",
    textAlignVertical: "top",
  },
  messageBubble: {
    padding: 10,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: "75%",
  },
  userBubble: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
  },
  botBubble: {
    backgroundColor: "#e5e5ea",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#fff",
  },
  chatMiniContainer: {
    width: 110,
    height: 160,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
  chatMiniTop: {
    backgroundColor: "#fff",
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  chatMiniDivider: {
    height: 1,
    width: "100%",
    backgroundColor: "#e0e0e0",
  },
  chatMiniBottom: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  chatMiniIcon: {
    marginBottom: 6,
  },
  chatMiniTextWrap: {
    paddingBottom: 4,
  },
  chatMiniText: {
    fontSize: 12,
    textAlign: "center",
    color: "#333",
  },
  sendButton: {
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
