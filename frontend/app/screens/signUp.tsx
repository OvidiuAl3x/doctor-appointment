import { Image, Text, View } from "react-native";
import { COLORS, icons, SIZES } from "../../constants";

const SignIn = () => {
  return (
    <View
      style={{
        flex: 1,
        padding: SIZES.medium,
        backgroundColor: COLORS.background,
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
