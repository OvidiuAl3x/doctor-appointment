import { SafeAreaView, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SIZES } from "../../constants";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        ></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
