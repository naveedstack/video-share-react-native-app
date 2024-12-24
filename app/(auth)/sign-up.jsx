import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../api/user";

const Signup = () => {
  const [form, setForm] = useState({ userName: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const signupHandler = async () => {
    if (!form.userName) Alert.alert("Error", "Please enter username");
    else if (form.email === "") Alert.alert("Error", "Please enter your email");
    else if (form.password === "")
      Alert.alert("Error", "Please enter your passowrd");
    else {
      setIsSubmitting(true);

      try {
        await createUser(form);
        router.replace('/home')
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center h-full my-6 px-5">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="-ml-2 w-[140px] h-[40px]"
          />
          <Text className="text-white text-2xl text-semibold mt-5 font-psemibold">
            Sign up to Vshare
          </Text>
          <FormField
            title={"Username"}
            value={form.userName}
            handleChange={(e) => setForm({ ...form, userName: e })}
            containerStyles={"mt-7"}
          />
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
            title="Sign Up"
            handlePress={signupHandler}
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg font-pregular text-gray-100">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
