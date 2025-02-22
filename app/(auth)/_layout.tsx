import { useAuth } from "@/context/auth-context";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// import { Loader } from "../../components";

const AuthLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  console.log('Auth state:', { isAuthenticated, loading });

  if (!loading && isAuthenticated) return <Redirect href="/discover" />;

  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
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
