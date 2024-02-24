import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, icons, SIZES } from "../../constants";

const SignIn = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        padding: SIZES.medium,
        backgroundColor: COLORS.lightWhite,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={icons.doctor} style={{ width: 50, height: 50 }} />
      <Text>Sign UP</Text>
    </View>
  );
};

export default SignIn;
