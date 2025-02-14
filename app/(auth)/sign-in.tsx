import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import images from "@/constants/images";
import { CustomButton, FormField } from "@/components";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/context/auth-context";

const SignIn = () => {
  const { login, loading, error } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const isDisabled = !credentials.email && !credentials.password


  const handleSubmit = async () => {
    try {
      await login(credentials);

      Alert.alert("Success", "Enjoy your music!");
      router.replace("/discover");
    } catch (err: any) {
      Alert.alert("Error", error! || err.message);
    }
  };

  return (
    <LinearGradient
      colors={['#393939', '#18181b', '#101010']}
      locations={[0, 0.25, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView className=" h-full">
        <ScrollView>
          <View
            className="w-full justify-center h-full px-4 my-6"
            style={{
              minHeight: Dimensions.get("window").height - 100,
            }}
          >
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[115px] h-[34px] self-center"
            />

            <Text className="text-2xl font-semibold text-center text-white mt-10 font-psemibold">
              Log in to NoirBeats
            </Text>

            <FormField
              title="Email"
              placeholder=""
              value={credentials.email}
              handleChangeText={(text) => setCredentials({ ...credentials, email: text })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={credentials.password}
              handleChangeText={(text) => setCredentials({ ...credentials, password: text })}
              placeholder=""
              otherStyles="mt-7"
            />

            <CustomButton
              title="Sign In"
              disabled={isDisabled}
              handlePress={isDisabled ? () => { } : handleSubmit}
              containerStyles="mt-7"
              isLoading={loading}
            />

            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Don't have an account?
              </Text>
              <Link
                href="/sign-up"
                className="text-lg font-psemibold text-secondary"
              >
                Signup
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignIn;
