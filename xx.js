// import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// const AuthStack = createStackNavigator();
// const MainTab = createBottomTabNavigator();
//
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import PostsScreen from "./screens/mainScreen/PostsScreen";
import CreateScreen from "./screens/mainScreen/CreateScreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";

import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegisterScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize = 24;
          if (route.name === "TrendsPage") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
            iconSize = focused ? 36 : 28;
            return (
              <Foundation name="graph-trend" size={iconSize} color={color} />
            );
          } else if (route.name === "SearchPage") {
            iconName = focused ? "ios-list-box" : "ios-list";
            iconSize = focused ? 32 : 24;
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "purple",
        inactiveTintColor: "white",
        inactiveBackgroundColor: "rgb(24, 24, 24)",
        activeBackgroundColor: "rgb(24, 24, 24)",
      }}
    >
      <Tab.Screen name="TrendsPage" component={LoginScreen} />
      <Tab.Screen name="SearchPage" component={RegisterScreen} />
    </Tab.Navigator>
  );
};
