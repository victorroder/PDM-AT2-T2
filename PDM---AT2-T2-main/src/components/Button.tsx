import React, { useState } from "react";
import {
  Animated,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Variant = "primary" | "secondary" | "info";

type Props = PressableProps & {
  title: string;
  variant?: Variant;
};

export default function Button({ title, variant = "primary", ...rest }: Props) {
  const [pressAnim] = useState(new Animated.Value(0));

  const handlePressIn = () => {
    Animated.timing(pressAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(pressAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const translateY = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 3],
  });

  const shadowOpacity = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.25, 0.1],
  });

  // Cores neutras
  const buttonShadowVariantStyle =
    variant === "secondary"
      ? styles.secondaryButtonShadow
      : variant === "info"
      ? styles.infoButtonShadow
      : styles.primaryButtonShadow;

  const buttonVariantStyle =
    variant === "secondary"
      ? styles.secondaryButton
      : variant === "info"
      ? styles.infoButton
      : styles.primaryButton;

  const buttonTextVariantStyle =
    variant === "secondary"
      ? styles.secondaryButtonText
      : variant === "info"
      ? styles.infoButtonText
      : styles.primaryButtonText;

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} {...rest}>
      <View style={styles.buttonWrapper}>
        <Animated.View
          style={[
            styles.buttonShadow,
            buttonShadowVariantStyle,
            { opacity: shadowOpacity },
          ]}
        />
        <Animated.View
          style={[
            styles.button,
            buttonVariantStyle,
            { transform: [{ translateY }] },
          ]}
        >
          <Text style={[styles.buttonText, buttonTextVariantStyle]}>{title}</Text>
        </Animated.View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    position: "relative",
    width: "100%",
    height: 56,
  },
  buttonShadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#000",
    opacity: 0.25,
  },
  primaryButtonShadow: {
    backgroundColor: "#3B1D6A", // sombra preta
  },
  secondaryButtonShadow: {
    backgroundColor: "#E0D1FF",
  },
  infoButtonShadow: {
    backgroundColor: "#8B5CF6",
  },
  button: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderBottomWidth: 0,
  },
  primaryButton: {
    backgroundColor: "#3B1D6A", // botão preto
    borderColor: "#3B1D6A",
  },
  secondaryButton: {
    backgroundColor: "#F5F0FF",
    borderColor: "#D6C8FF",
  },
  infoButton: {
    backgroundColor: "#8B5CF6",
    borderColor: "#6D28D9",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  primaryButtonText: {
    color: "#FFFFFF", // letra branca
  },
  secondaryButtonText: {
    color: "#6D4BC9",
  },
  infoButtonText: {
    color: "#FFFFFF",
  },
});
