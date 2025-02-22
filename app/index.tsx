import { CustomButton } from "@/components";
import images from "@/constants/images";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <LinearGradient
      colors={['#393939', '#18181b', '#101010']}
      locations={[0, 0.25, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView className=" h-full relative">
        <View
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            backgroundColor: "rgba(255, 223, 0, 0.2)",
            borderRadius: 100,
            transform: [{ rotate: "45deg" }],
          }}
        />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-center items-center px-4">
            <Image
              source={images.logo}
              className="w-32 h-20"
              resizeMode="contain"
            />
            <View className="mt-4">
              <View className="w-1 h-72 bg-yellow-500 rounded-xl shadow-lg" />
            </View>
            <View className="mt-5">
              <Text className="text-3xl text-white font-bold text-center">
                Elevate Your Sound with{" "}
                <Text className="text-yellow-500">NoirBeats</Text>
              </Text>
            </View>
            <Text className="mt-5 text-base text-gray-200 text-center">
              Discover. Listen. Live the Rhythm.
            </Text>
            <CustomButton
              title="Start Listening"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-full mt-7 rounded-lg"
            />
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#000000" style="light" />
        <View
          style={{
            position: "absolute",
            bottom: -40,
            left: 10,
            width: 200,
            height: 200,
            zIndex: -10,
            backgroundColor: "rgba(255, 223, 0, 0.2)",
            borderRadius: 100,
          }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
