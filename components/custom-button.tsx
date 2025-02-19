import React from "react";
import { ActivityIndicator, ButtonProps, Text, TouchableOpacity, View } from "react-native";

interface CustomButtonProps extends ButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
  variant?: "default" | "ghost" | "descriptive" | "badge";
  description?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles = "",
  textStyles = "",
  isLoading = false,
  variant = "default",
  description,
}) => {
  let variantContainerStyles = "";
  let variantTextStyles = "";

  switch (variant) {
    case "ghost":
      variantContainerStyles = "bg-transparent border border-white";
      variantTextStyles = "text-white";
      break;
    case "descriptive":
      variantContainerStyles = "bg-yellow-500";
      variantTextStyles = "text-white";
      break;
    case "badge":
      variantContainerStyles = "bg-black/10 rounded-full border border-zinc-200/20 focus:border-zinc-50";
      variantTextStyles = "text-white";
      break;
    default:
      variantContainerStyles = "bg-yellow-500 px-4 min-h-[62px]";
      variantTextStyles = "text-white";
      break;
  }

  const baseContainerStyles = `flex flex-row justify-center items-center  ${variantContainerStyles} ${containerStyles}`;
  const baseTextStyles = `font-psemibold text-lg ${variantTextStyles} ${textStyles}`;

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}

      className={`${baseContainerStyles} ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >

      <View className="flex-col items-center">
        <Text className={baseTextStyles}>{title}</Text>
        {variant === "descriptive" && description && (
          <Text className="text-xs text-white mt-1">{description}</Text>
        )}
      </View>
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
