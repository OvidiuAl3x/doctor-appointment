import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS, FONT, SIZES, icons } from "../../constants";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";

type Doctor = {
  _id: number;
  firstName: string;
  lastName: string;
  fieldActivity: string;
  hospital: string;
};

type Props = {
  data: Doctor[];
};

const Doctors: React.FC<Props> = ({ data }) => {
  return (
    <View style={{ marginTop: 30 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.medium }}>
          Top Doctors
        </Text>
        <Text style={{ color: COLORS.primary }}>See all</Text>
      </View>
      {data?.map((item) => (
        <View
          key={item._id}
          style={{
            flexDirection: "row",
            marginTop: 30,
            borderWidth: 1,
            borderColor: COLORS.gray,
            padding: 10,
            borderRadius: 12,
            gap: 20,
          }}
        >
          <Image
            source={icons.templateDoctor}
            style={{ width: 100, height: 100 }}
          />

          <View style={{ flex: 1, justifyContent: "space-around" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.medium }}>
                Dr. {item.firstName} {item.lastName}
              </Text>
              <GestureHandlerRootView>
                <TouchableOpacity>
                  <Image
                    source={icons.heart}
                    style={{
                      width: 25,
                      height: 25,
                      marginLeft: "auto",
                      tintColor: COLORS.gray2,
                    }}
                  />
                </TouchableOpacity>
              </GestureHandlerRootView>
            </View>

            <Text>{item.fieldActivity}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>Available at {item.hospital}</Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Image source={icons.star} style={{ width: 20, height: 20 }} />
                <Text>4.8</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Doctors;

const styles = StyleSheet.create({});
