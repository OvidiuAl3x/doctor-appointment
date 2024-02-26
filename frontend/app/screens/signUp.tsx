import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { COLORS, FONT, icons, SHADOWS, SIZES } from "../../constants";
import { Link, useNavigation } from "expo-router";
import { useRef, useState } from "react";
import axios from "axios";

type Account = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
};

type YourNavigationType = {
  navigate: any;
};

const SignIn = () => {
  const lastNameInputRef = useRef<TextInput>(null);
  const phoneNumberInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);

  const [newAccount, setNewAccount] = useState<Account>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const navigation = useNavigation<YourNavigationType>();

  const handleInputChange = (text: string, fieldName: keyof Account) => {
    setNewAccount((prevAccount) => ({ ...prevAccount, [fieldName]: text }));
  };

  const handleCreateAccount = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5555/patients/register",
        {
          firstName: newAccount.firstName,
          lastName: newAccount.lastName,
          phoneNumber: newAccount.phoneNumber,
          email: newAccount.email,
          password: newAccount.password,
        }
      );

      setTimeout(() => {
        navigation.navigate("screens/Login");
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const {
    container,
    inputStyle,
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
        <View>
          <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large }}>
            Sign Up
          </Text>
          <Text
            style={{
              fontSize: SIZES.small,
              color: COLORS.gray,
              marginBottom: 20,
            }}
          >
            Please complete your details to Signin
          </Text>
          <View>
            <View style={inputParents}>
              <Image source={icons.user} style={iconsStyle} />
              <TextInput
                style={inputStyle}
                placeholder="First Name"
                autoCapitalize="none"
                returnKeyType="next"
                value={newAccount.firstName}
                onChangeText={(text) => handleInputChange(text, "firstName")}
                onSubmitEditing={() => {
                  lastNameInputRef.current?.focus();
                }}
              />
            </View>
            <View style={inputParents}>
              <Image source={icons.user} style={iconsStyle} />
              <TextInput
                style={inputStyle}
                placeholder="Last Name"
                autoCapitalize="none"
                returnKeyType="next"
                ref={lastNameInputRef}
                value={newAccount.lastName}
                onChangeText={(text) => handleInputChange(text, "lastName")}
                onSubmitEditing={() => {
                  phoneNumberInputRef.current?.focus();
                }}
              />
            </View>
            <View style={inputParents}>
              <Image source={icons.phone} style={iconsStyle} />
              <TextInput
                style={inputStyle}
                placeholder="Phone Number"
                autoCapitalize="none"
                returnKeyType="next"
                ref={phoneNumberInputRef}
                value={newAccount.phoneNumber}
                onChangeText={(text) => handleInputChange(text, "phoneNumber")}
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
            </View>
            <View style={inputParents}>
              <Image source={icons.mail} style={iconsStyle} />
              <TextInput
                style={inputStyle}
                placeholder="E-mail"
                autoCapitalize="none"
                returnKeyType="next"
                ref={emailInputRef}
                value={newAccount.email}
                onChangeText={(text) => handleInputChange(text, "email")}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
            </View>

            <View style={inputParents}>
              <Image source={icons.padlock} style={iconsStyle} />
              <TextInput
                placeholder="Password"
                secureTextEntry
                autoCapitalize="none"
                style={inputStyle}
                returnKeyType="next"
                ref={passwordInputRef}
                value={newAccount.password}
                onChangeText={(text) => handleInputChange(text, "password")}
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus();
                }}
              />
            </View>
            <View style={inputParents}>
              <Image source={icons.padlock} style={iconsStyle} />
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry
                autoCapitalize="none"
                style={inputStyle}
                returnKeyType="done"
                ref={confirmPasswordInputRef}
              />
            </View>

            <Pressable onPress={handleCreateAccount}>
              <View style={[loginButtonContainer, SHADOWS.medium]}>
                <Text style={loginButton}>Sign Up</Text>
              </View>
            </Pressable>
          </View>

          <Text style={{ color: COLORS.gray, marginTop: 30 }}>
            Already have an account?
          </Text>

          <Link
            href="/screens/Login"
            style={{ fontSize: SIZES.medium, color: COLORS.blue }}
          >
            Sign In
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

export default SignIn;
