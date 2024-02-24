import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link } from "expo-router";
import { COLORS, FONT, icons, SHADOWS, SIZES } from "../../constants";
import { useRef } from "react";

const Login = () => {
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleEmailSubmit = () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  const handlePasswordSubmit = () => {
    Keyboard.dismiss();
  };

  const {
    container,
    image,
    containerInputs,
    inputStyle,
    forgotPass,
    loginButton,
    loginButtonContainer,
    iconsStyle,
    inputParents,
  } = styles;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={false}
    >
      <View style={container}>
        <Image source={icons.doctor} style={image} />

        <View>
          <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large }}>
            Login
          </Text>
          <Text style={{ fontSize: SIZES.small, color: COLORS.gray }}>
            Please Sign In to continue
          </Text>
          <View style={containerInputs}>
            <View style={inputParents}>
              <Image source={icons.mail} style={iconsStyle} />
              <TextInput
                style={inputStyle}
                ref={emailInputRef}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={handleEmailSubmit}
              />
            </View>

            <View style={inputParents}>
              <Image source={icons.padlock} style={iconsStyle} />
              <TextInput
                ref={passwordInputRef}
                placeholder="Password"
                secureTextEntry
                autoCapitalize="none"
                style={inputStyle}
                returnKeyType="done"
                onSubmitEditing={handlePasswordSubmit}
              />
            </View>

            <Link href="" style={forgotPass}>
              Forgot Password?
            </Link>
            <View style={[loginButtonContainer, SHADOWS.medium]}>
              <Text style={loginButton}>LOGIN</Text>
            </View>
          </View>

          <Text style={{ color: COLORS.gray, marginTop: 30 }}>
            Don't have and account?
          </Text>
          <Link
            href="/screens/signUp"
            style={{ fontSize: SIZES.medium, color: COLORS.blue }}
          >
            Sign Up
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.medium,
    backgroundColor: COLORS.lightWhite,
    justifyContent: "center",
    marginTop: -100,
  },
  image: {
    width: 70,
    height: 70,
    alignSelf: "center",
    marginBottom: 50,
  },
  containerInputs: {
    // marginBottom: 5,
    // backgroundColor: "red",
  },

  inputParents: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: COLORS.gray2,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  iconsStyle: {
    width: 20,
    height: 20,
  },
  inputStyle: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  forgotPass: {
    alignSelf: "flex-end",
    color: COLORS.blue,
    marginBottom: 10,
  },
  loginButtonContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 10,
    marginTop: 30,
  },
  loginButton: {
    alignSelf: "center",
  },
});

export default Login;
