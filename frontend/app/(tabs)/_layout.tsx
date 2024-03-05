import { Stack, Tabs } from "expo-router";
import { useFonts } from "expo-font";
import HeaderLeft from "../../components/home/header/HeaderLeft";
import HeaderRight from "../../components/home/header/HeaderRight";
import { COLORS, FONT, SIZES, icons } from "../../constants";
import { Image } from "react-native";

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        // For notification number
        // tabBarBadge: 3,
        // tabBarBadgeStyle: {
        //   color: COLORS.background,
        //   backgroundColor: COLORS.primary,
        // },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerStyle: { backgroundColor: COLORS.background },
          headerShadowVisible: false,
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderRight />,
          headerTitle: "",
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.home}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? COLORS.primary : COLORS.gray,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="screens/Appointments"
        options={{
          headerTitle: "Appointments",
          title: "Appointments",
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.appointments}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? COLORS.primary : COLORS.gray,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="screens/Notification"
        options={{
          headerTitle: "Notification",
          title: "Notification",
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.notification}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? COLORS.primary : COLORS.gray,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="screens/Profile"
        options={{
          headerTitle: "Profile",
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.user}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? COLORS.primary : COLORS.gray,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
