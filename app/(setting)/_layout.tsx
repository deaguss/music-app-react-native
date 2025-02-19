import { useAuth } from "@/context/auth-context";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// import { Loader } from "../../components";

const AuthLayout = () => {
    const { isAuthenticated, loading } = useAuth();

    if (!loading && !isAuthenticated) return <Redirect href="/sign-in" />;

    return (
        <>
            <Stack>
                <Stack.Screen
                    name="main-setting"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
            {/* 
      <Loader isLoading={loading} /> */}
            <StatusBar backgroundColor="#161622" style="light" />
        </>
    );
};

export default AuthLayout;
