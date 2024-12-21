import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChange,
  containerStyles,
  ...props
}) => {
  const [showPassowrd, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`space-y-2 ${containerStyles}`}>
      <Text className="text-base text-gray-100 font-medium ml-2 mb-2">
        {title}
      </Text>
      <View
        className={`w-full rounded-2xl h-16 px-4 flex-row justify-between items-center ${
          isFocused ? "border-secondary" : "border-black-200"
        } bg-black-100 border-2`}
      >
        <TextInput
          className="text-base flex-1 text-white font-psemibold"
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          value={value}
          onChangeText={handleChange}
          secureTextEntry={title === "Password" && !showPassowrd}
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassowrd)}>
            <Image
              source={showPassowrd ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              className=" w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
