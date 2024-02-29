import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { COLORS } from "../constants";
import HeaderLeft from "../components/home/header/HeaderLeft";

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
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderLeft />,
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
