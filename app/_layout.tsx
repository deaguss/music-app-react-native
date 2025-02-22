import { router, SplashScreen, Stack } from "expo-router";
import "@/global.css";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PlayerModalProvider } from "@/provider/player-provider";
import { AuthProvider } from "@/context/auth-context";
import { MusicPlayerProvider } from "@/context/music-player-context";
import { ModalProvider } from "@/provider/modal-provider";
import { ModalFullProvider } from "@/provider/modal-full-provider";
import { Image, TouchableOpacity } from "react-native";
import icons from "@/constants/icons";
import { ArtistProvider } from "@/context/artist-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ArtistProvider>
          <MusicPlayerProvider>
            <ModalProvider>
              <ModalFullProvider>
                <PlayerModalProvider>
                  <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen
                      name="(setting)"
                      options={({ navigation }) => ({
                        title: "Setting",
                        headerStyle: { backgroundColor: '#121212' },
                        headerTintColor: '#FFFFFF',
                        headerLeft: () => (
                          <TouchableOpacity onPress={() => router.replace("/account")} style={{ marginEnd: 8 }}>
                            <Image
                              source={icons.leftArrow}
                              tintColor={'#FFFFFF'}
                              style={{ width: 14, height: 14 }}
                            />
                          </TouchableOpacity>
                        ),
                      })}
                    />
                  </Stack>
                </PlayerModalProvider>
              </ModalFullProvider>
            </ModalProvider>
          </MusicPlayerProvider>
        </ArtistProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
