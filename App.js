import * as React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TopTracksScreen from "./screens/auth/topTracksScreen";
import searchTracksScreen from "./screens/auth/searchTracksScreen";
import {
  Foundation,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

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
              let iconColor = "white";
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
                iconSize = focused ? 32 : 24;
                iconColor = focused ? "purple" : "white";
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
            inactiveTintColor: "white",
            inactiveBackgroundColor: "rgb(24, 24, 24)",
            activeBackgroundColor: "rgb(24, 24, 24)",
            style: {
              borderTopColor: "rgb(24, 24, 24)",
            },
            showLabel: false,
          }}
        >
          <Tab.Screen name="TrendsPage" component={TopTracksScreen} />
          <Tab.Screen name="SearchPage" component={searchTracksScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
