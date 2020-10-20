import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TopTracksScreen from "./screens/auth/topTracksScreen";
import searchTracksScreen from "./screens/auth/searchTracksScreen";
import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function rootPage() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconSize = 24;
          let iconColor = "white";
          if (route.name === "TrendsPage") {
            iconSize = focused ? 36 : 28;
            return (
              <Foundation name="graph-trend" size={iconSize} color={color} />
            );
          } else if (route.name === "SearchPage") {
            iconSize = focused ? 32 : 24;
            iconColor = focused ? "purple" : "black";
            return (
              <MaterialCommunityIcons
                name="music-circle"
                size={iconSize}
                color={iconColor}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "purple",
        inactiveTintColor: "black",
        inactiveBackgroundColor: "white",
        activeBackgroundColor: "white",
        style: {
          borderTopColor: "#b4b4b4",
        },
        showLabel: false,
      }}
    >
      <Tab.Screen name="TrendsPage" component={TopTracksScreen} />
      <Tab.Screen name="SearchPage" component={searchTracksScreen} />
    </Tab.Navigator>
  );
}
