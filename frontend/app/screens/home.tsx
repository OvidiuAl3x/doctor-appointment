import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { COLORS, SIZES } from "../../constants";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Text>ASdasd</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
