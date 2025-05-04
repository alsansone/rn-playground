import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
} from "react-native-reanimated";

const DOT_COUNT = 3;
const DOT_SIZE = 8;
const ANIMATION_DURATION = 600;
const ANIMATION_DELAY = 150;
const MAX_SCALE = 1.5;

const TypingIndicator = () => {
  // Create a shared value for each dot
  const scales = Array.from({ length: DOT_COUNT }).map(() => useSharedValue(1));

  useEffect(() => {
    scales.forEach((scale, index) => {
      // Delay each dot's animation start, then loop scale up/down indefinitely
      scale.value = withDelay(
        index * ANIMATION_DELAY,
        withRepeat(
          withSequence(
            withTiming(MAX_SCALE, { duration: ANIMATION_DURATION }),
            withTiming(1, { duration: ANIMATION_DURATION })
          ),
          -1,
          false
        )
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      {scales.map((scale, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ scale: scale.value }],
        }));
        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                width: DOT_SIZE,
                height: DOT_SIZE,
                borderRadius: DOT_SIZE / 2,
                backgroundColor: "#fff",
              },
              animatedStyle,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 30,
    width: 60,
    backgroundColor: "lightgray",
    borderRadius: 12,
    padding: 5,
  },
  dot: {
    marginHorizontal: 8,
  },
});

export default TypingIndicator;
