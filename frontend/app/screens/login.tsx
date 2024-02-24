import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { COLORS, FONT, icons, SHADOWS, SIZES } from "../../constants";
import { useRef } from "react";

const Login = () => {
  const router = useRouter();

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
  } = styles;
  return (
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
          <TextInput
            style={inputStyle}
            ref={emailInputRef}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={handleEmailSubmit}
          />

          <TextInput
            ref={passwordInputRef}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            style={inputStyle}
            returnKeyType="done"
            onSubmitEditing={handlePasswordSubmit}
          />
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
          href="signIn"
          style={{ fontSize: SIZES.medium, color: COLORS.blue }}
        >
          Sign Up
        </Link>
      </View>
    </View>
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
  inputStyle: {
    marginTop: 20,
    height: 40,
    borderBottomColor: COLORS.gray2,
    borderBottomWidth: 1,
    marginBottom: 20,
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
