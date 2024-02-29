import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, useNavigation } from "expo-router";
import { COLORS, FONT, icons, SHADOWS, SIZES } from "../../constants";
import { useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type YourNavigationType = {
  navigate: any;
};

type ErrorResponse = {
  message: string;
};

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string }>({ message: "" });

  const handleEmailSubmit = () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  const handlePasswordSubmit = () => {
    Keyboard.dismiss();
  };

  const navigation = useNavigation<YourNavigationType>();
  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await axios.post("http://192.168.100.18:5555/login", {
        email,
        password,
      });
      const { token } = response.data;
      console.log("Login response:", response.data);
      await AsyncStorage.setItem("token", token);

      setTimeout(() => {
        navigation.navigate("screens/Home");
        setLoading(false);
      }, 2000);
    } catch (error) {
      if ((error as AxiosError).response) {
        const axiosError = error as AxiosError;
        console.log(
          "Server responded with an error:",
          axiosError.response?.data
        );
        const messageAxios = axiosError.response?.data as ErrorResponse;
        if (messageAxios.message === "user not found") {
          setError({ message: "user not found" });
        }
        if (messageAxios.message === "Invalid password") {
          setError({ message: "Invalid password" });
        }
      } else if ((error as AxiosError).request) {
        console.log("No response received from the server");
      } else {
        console.error(
          "Error setting up the request:",
          (error as Error).message
        );
      }
      setLoading(false);
    }
  };

  const {
    container,
    image,
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
          <View>
            <View
              style={[
                inputParents,
                error.message === "user not found" && { ...styles.errorInput },
              ]}
            >
              <Image source={icons.mail} style={iconsStyle} />
              <TextInput
                style={inputStyle}
                ref={emailInputRef}
                placeholder="E-mail"
                autoCapitalize="none"
                enterKeyHint="next"
                onSubmitEditing={handleEmailSubmit}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View
              style={[
                inputParents,
                error.message === "Invalid password" && {
                  ...styles.errorInput,
                },
              ]}
            >
              <Image source={icons.padlock} style={iconsStyle} />
              <TextInput
                ref={passwordInputRef}
                placeholder="Password"
                secureTextEntry
                autoCapitalize="none"
                style={inputStyle}
                enterKeyHint="done"
                onSubmitEditing={handlePasswordSubmit}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <Link href="" style={forgotPass}>
              Forgot Password?
            </Link>

            <TouchableOpacity onPress={handleLogin}>
              <View style={[loginButtonContainer, SHADOWS.medium]}>
                <Text style={loginButton}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={{ color: COLORS.gray, marginTop: 30 }}>
            Don't have and account?
          </Text>

          <Link
            href="/screens/SignUp"
            style={{ fontSize: SIZES.medium, color: COLORS.blue }}
          >
            Sign Up
          </Link>
        </View>
        <Modal visible={loading} transparent animationType="slide">
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.medium,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    marginTop: -100,
  },
  image: {
    width: 70,
    height: 70,
    alignSelf: "center",
    marginBottom: 50,
  },
  errorInput: {
    borderBottomColor: COLORS.red,
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
