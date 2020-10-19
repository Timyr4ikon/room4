import * as React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import { Foundation, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
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
                  <Foundation
                    name="graph-trend"
                    size={iconSize}
                    color={color}
                  />
                );
              } else if (route.name === "SearchPage") {
                iconName = focused ? "ios-list-box" : "ios-list";
                iconSize = focused ? 32 : 24;
                return (
                  <Ionicons name={iconName} size={iconSize} color={color} />
                );
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: "purple",
            inactiveTintColor: "white",
            inactiveBackgroundColor: "rgb(24, 24, 24)",
            activeBackgroundColor: "rgb(24, 24, 24)",
            style: {
              borderTopColor: "rgb(24, 24, 24)",
            },
          }}
        >
          <Tab.Screen name="TrendsPage" component={LoginScreen} />
          <Tab.Screen name="SearchPage" component={RegisterScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
