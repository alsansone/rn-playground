import { StyleSheet } from "react-native";

export default StyleSheet.create({
  morphContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    zIndex: 999,
    // Android
    elevation: 12,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  chatContent: {
    flex: 1,
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
  header: {
    height: 60,
    backgroundColor: "#f7f7f7",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
});
