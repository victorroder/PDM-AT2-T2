import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <>
      <StatusBar style="auto" />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#2E3A59",
          tabBarInactiveTintColor: "#A0A0A0",
          tabBarStyle: {
            backgroundColor: "#F5F0FF",
            borderTopWidth: 1,
            borderTopColor: "#E0E0E0",
            height: Platform.OS === "ios" ? 90 : 75,
            paddingBottom: Platform.OS === "ios" ? 20 : 10,
            paddingTop: 10,
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 5,
            elevation: 3,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            marginTop: 4,
          },
          headerStyle: {
            backgroundColor: "#F5F0FF",
          },
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 18,
            color: "#2E3A59",
          },
          headerShadowVisible: false,
        }}
      >

        <Tabs.Screen
          name="index"
          options={{
            title: "Início",
            tabBarIcon: ({ color, focused }) => (
              <Octicons
                name={focused ? "home" : "home"}
                size={26}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color, focused }) => (
              <Octicons
                name={focused ? "person" : "person"}
                size={26}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
}
