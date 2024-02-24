import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { COLORS, icons } from "../constants";
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn";

// export const unstable_settings = {
//   // Ensure any route can link back to `/`
//   initialRouteName: "home",
// };

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="screens/Home"
        options={{
          headerStyle: { backgroundColor: COLORS.background },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension={20} />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension={20} />
          ),
          headerTitle: "",
        }}
      />
      <Stack.Screen name="screens/Login" options={{ headerShown: false }} />
      <Stack.Screen
        name="screens/SignUp"
        options={{ headerTitle: "Sign Up", headerTitleAlign: "center" }}
      />
    </Stack>
  );
};

export default Layout;
