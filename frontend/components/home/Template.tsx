import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import { COLORS, FONT, icons } from "../../constants";

const Slide = ({
  title,
  content,
  image,
}: {
  title: string;
  content: string;
  image: any;
}) => (
  <View style={styles.slide}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.content}>{content}</Text>
    <Image source={image} style={styles.image} />
  </View>
);
const Template = () => {
  const slides = [
    {
      title: "Medical Checks!",
      content:
        "Check your health regularly to minimize the incidence of disease in the future",
      image: icons.templateDoctor,
    },
    {
      title: "Medical Checks!",
      content: "Check your health regularly.",
      image: icons.templateDoctor2,
    },
  ];

  return (
    <Swiper
      loop={true}
      autoplay={false}
      height={150}
      showsPagination={false}
      autoplayTimeout={5}
    >
      {slides.map((slide, index) => (
        <View style={styles.slide} key={index}>
          <View style={styles.containerText}>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.content}>{slide.content}</Text>
          </View>
          <Image source={slide.image} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: COLORS.primary,
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 2,
    borderRadius: 26,
  },
  containerText: {
    flex: 1,
    justifyContent: "center",
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: FONT.bold,
    marginBottom: 10,
    color: COLORS.background,
  },
  content: {
    fontSize: 15,
    fontFamily: FONT.regular,
  },
  image: {
    alignSelf: "flex-end",
    width: 100,
    height: 100,
  },
});

export default Template;
