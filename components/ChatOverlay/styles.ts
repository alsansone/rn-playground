import { StyleSheet } from "react-native";

export default StyleSheet.create({
  morphContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    zIndex: 999,
    overflow: "hidden",
    elevation: 12,
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
  // Floating bubble
  bubble: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    elevation: 10,
  },

  // Full-screen expanded chat
  expandedContainer: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "hidden",
    zIndex: 999,
  },
  minimizeText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  chatBody: {
    flex: 1,
    padding: 16,
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
});
