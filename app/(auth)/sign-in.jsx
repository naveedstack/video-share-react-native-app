import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const loginHanlder = () => {
    if (form.email === "") Alert.alert("Error", "Please enter your email");
    else if (form.password === "")
      Alert.alert("Error", "Please enter your passowrd");
    else {
      try {
        setIsSubmitting(true);
        router.push("/home");
      } catch (error) {
        Alert.alert("Error", "Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center h-full px-5 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="-ml-2 w-[140px] h-[40px]"
          />
          <Text className="text-white text-2xl text-semibold mt-5 font-psemibold">
            Log in to Vshare
          </Text>
          <FormField
            title={"Email"}
            value={form.email}
            handleChange={(e) => setForm({ ...form, email: e })}
            containerStyles={"mt-7"}
            keyboardType="email-address"
          />
          <FormField
            title={"Password"}
            value={form.password}
            handleChange={(e) => setForm({ ...form, password: e })}
            containerStyles={"mt-7"}
          />

          <CustomButton
            title="Log In"
            handlePress={loginHanlder}
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg font-pregular text-gray-100">
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
  );
};

export default SignIn;
