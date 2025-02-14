import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import icons from "@/constants/icons";
import { useAuth } from "@/context/auth-context";
// import { Loader } from "../../components";

interface TabIconProps {
    icon: ImageSourcePropType;
    color: string;
    name: string;
    focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
    return (
        <View className="flex items-center justify-center  gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-7 h-7 mt-10"
            />
            <Text
                className={`${focused ? "font-psemibold" : "font-pregular"} text-center w-[50px] text-xs`}
                style={{ color: color }}
            >
                {name}
            </Text>
        </View>
    );
};

const TabLayout = () => {
    const { isAuthenticated, loading } = useAuth();

    if (!loading && !isAuthenticated) return <Redirect href="/sign-in" />;

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "#eab308",
                    tabBarInactiveTintColor: "#CDCDE0",
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        borderWidth: 0.5,
                        backgroundColor: "#1E1E1E",
                        height: 72,
                        borderTopWidth: 0,
                        borderColor: "grey",
                        position: "absolute",
                    },
                }}
            >
                <Tabs.Screen
                    name="discover"
                    options={{
                        title: "Discover",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.discover}
                                color={color}
                                name="Discover"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="search"
                    options={{
                        title: "Search",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.search}
                                color={color}
                                name="Search"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="library"
                    options={{
                        title: "Library",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.library}
                                color={color}
                                name="Library"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="account"
                    options={{
                        title: "Account",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.account}
                                color={color}
                                name="Account"
                                focused={focused}
                            />
                        ),
                    }}
                />

            </Tabs >

            {/* <Loader isLoading={loading} /> */}
            < StatusBar backgroundColor="#161622" style="light" />
        </>
    );
};

export default TabLayout;
