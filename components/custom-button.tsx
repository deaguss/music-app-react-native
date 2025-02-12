import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
  variant?: "default" | "ghost" | "descriptive";
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
    case "default":
    default:
      variantContainerStyles = "bg-yellow-500";
      variantTextStyles = "text-white";
      break;
  }

  const baseContainerStyles = `rounded-xl min-h-[62px] flex flex-row justify-center items-center px-4 ${variantContainerStyles} ${containerStyles}`;
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
