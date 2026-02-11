import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as Linking from "expo-linking";
import MapView, { Marker } from "react-native-maps";

export default function Detail() {
  //สร้างตัวแปรเก็บข้อมูลที่รับมาจากหน้า Home
  const params = useLocalSearchParams();

  // ฟังก์ชันสำหรับเปิดแอปโทรศัพท์
  const handleCallApp = () => {
    const phoneNumber = params.phone as string;
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
  };

  // ฟังก์ชันสำหรับเปิดแอปแผนที่
  const handleOpenMapApp = () => {
    //สร้างตัวแปรเพื่อเปิด Google Maps
    const googleMap = `https://maps.google.com/?q=${params.latitude},${params.longtitude}`;

    //สร้างตัวแปรเพื่อเปิด Apple Maps
    const appleMap = `http://maps.apple.com/?q=${params.name}?&ll=${params.latitude},${params.longtitude}`;

    //ตรวจสอบการเปิดแอป Google Maps หรือ Apple Maps โดยยึด Google Maps เป็นหลัก
    Linking.canOpenURL(googleMap).then((supported) => {
      if (supported) {
        Linking.openURL(googleMap);
      } else {
        Linking.openURL(appleMap);
      }
    });
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Image
        source={{ uri: params.image_url as string }}
        style={styles.shopImg}
      />

      {/* แสดงรายละเอียดของร้านกาแฟ */}
      <View style={{ padding: 18, gap: 10 }}>
        <Text
          style={{
            fontFamily: "Kanit_700Bold",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {params.name as string}
        </Text>
        <Text
          style={{
            fontFamily: "Kanit_400Regular",
            fontSize: 16,
            color: "#ABABAB",
          }}
        >
          {params.district as string}
        </Text>
        <Text style={{ fontFamily: "Kanit_400Regular", fontSize: 16 }}>
          {params.description as string}
        </Text>

        <TouchableOpacity
          onPress={handleCallApp}
          style={{
            marginTop: 10,
            paddingVertical: 15,
            backgroundColor: "#00a510",
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Kanit_400Regular",
              fontSize: 16,
              color: "white",
            }}
          >
            📞 {params.phone as string}
          </Text>
        </TouchableOpacity>

        <Text style={{ fontFamily: "Kanit_700Bold", fontSize: 16 }}>
          แผนที่ร้าน
        </Text>

        <MapView
          style={{ width: "100%", height: 300 }}
          initialRegion={{
            latitude: parseFloat(params.latitude as string),
            longitude: parseFloat(params.longtitude as string),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(params.latitude as string),
              longitude: parseFloat(params.longtitude as string),
            }}
            title={params.name as string}
            description={params.district as string}
            onPress={handleOpenMapApp}
          />
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  shopImg: { width: "100%", height: 200 },
});
