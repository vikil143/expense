import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Animated } from "react-native";
import { Icon } from "react-native-paper";
import SendIntentAndroid from "react-native-send-intent";

const paymentApps = {
  GPay: {
    id: "com.google.android.apps.nbu.paisa.user",
    icon: "google", // MaterialCommunityIcons name
  },
  PhonePe: {
    id: "com.phonepe.app",
    icon: "cellphone", // Example icon, change if you have a logo
  },
};

interface FABPayInitProps {
  onPress?: () => void;
}

export default function FABPayInit({ onPress }: FABPayInitProps) {
  const [expanded, setExpanded] = useState(false);
  const [avaliableApps, setAvaliableApps] = useState<any>({});
  const animation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const checkApps = async () => {
      const results: any = {};
      for (const [key, app] of Object.entries(paymentApps)) {
        const installed = await SendIntentAndroid.isAppInstalled(app.id);
        results[key] = installed;
      }
      setAvaliableApps(results);
    };
    checkApps();
  }, []);

  const toggleMenu = () => {
    setExpanded(!expanded);
    Animated.spring(animation, {
      toValue: expanded ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

  const renderAppButton = (name: string, icon: string, index: number) => {
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(index + 1) * 70],
    });

    return (
      <Animated.View
        key={name}
        style={[styles.miniButtonContainer, { transform: [{ translateY }] }]}
      >
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.miniButton}>
            <Icon source={icon} color="white" size={24} />
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  };

  return (
    <View style={styles.fabContainer}>
      {Object.entries(avaliableApps)
        .filter(([_, installed]) => installed)
        .map(([name, _], i) =>
          renderAppButton(name, paymentApps[name].icon, i)
        )}

      {/* Main FAB */}
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <View style={styles.fab}>
          <Icon source={expanded ? "close" : "plus"} color="white" size={28} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const SIZE = 60;

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    right: 30,
    bottom: 60,
    alignItems: "center",
  },
  fab: {
    backgroundColor: "#6200ee",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  miniButtonContainer: {
    position: "absolute",
    alignItems: "center",
  },
  miniButton: {
    backgroundColor: "#03dac6",
    width: SIZE * 0.7,
    height: SIZE * 0.7,
    borderRadius: (SIZE * 0.7) / 2,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
});
