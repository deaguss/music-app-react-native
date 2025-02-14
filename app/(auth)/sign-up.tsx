import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import images from "@/constants/images";
import { FormField, CustomButton } from "@/components";
import { useAuth } from "@/context/auth-context";

const SignUp = () => {
  const { register, loading, error } = useAuth();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const confirm_password = credentials.password === credentials.password_confirmation;

  const isDisabled =
    !credentials.email ||
    !credentials.password ||
    !credentials.password_confirmation ||
    !confirm_password;

  const handleSubmit = async () => {
    try {
      await register(credentials);
      router.replace("/discover");
    } catch (err: any) {
      Alert.alert("Error", error! || err.message);
    }
  };

  return (
    <LinearGradient
      colors={["#393939", "#18181b", "#101010"]}
      locations={[0, 0.25, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="h-full">
        <ScrollView>
          <View
            className="w-full flex justify-center h-full px-4 my-6"
            style={{
              minHeight: Dimensions.get("window").height - 100
            }}
          >
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[115px] h-[34px] self-center"
            />

            <Text className="text-2xl font-semibold text-center text-white mt-10 font-psemibold">
              Sign Up to NoirBeats
            </Text>

            <FormField
              title="Username"
              placeholder=""
              value={credentials.name}
              handleChangeText={(text) =>
                setCredentials({ ...credentials, name: text })
              }
              otherStyles="mt-10"
            />

            <FormField
              title="Email"
              placeholder=""
              value={credentials.email}
              handleChangeText={(text) =>
                setCredentials({ ...credentials, email: text })
              }
              otherStyles="mt-7"
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              placeholder=""
              value={credentials.password}
              handleChangeText={(text) =>
                setCredentials({ ...credentials, password: text })
              }
              otherStyles="mt-7"
            />

            <FormField
              title="Password Confirm"
              placeholder=""
              value={credentials.password_confirmation}
              handleChangeText={(text) =>
                setCredentials({ ...credentials, password_confirmation: text })
              }
              otherStyles="mt-7"
            />

            <CustomButton
              title="Sign Up"
              handlePress={isDisabled ? () => { } : handleSubmit}
              containerStyles="mt-7"
              isLoading={loading}
              disabled={isDisabled || loading}
            />

            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Have an account already?
              </Text>
              <Link
                href="/sign-in"
                className="text-lg font-psemibold text-secondary"
              >
                Login
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignUp;
