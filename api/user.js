import { ID, Query } from "react-native-appwrite";
import { account, avatar, config, databases } from "../lib/appwrite";
import { Alert } from "react-native";

export const createUser = async ({ userName, email, password }) => {
  console.log("api", userName, email, password);
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      userName
    );
    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatar.getInitials(userName);
    console.log("Avatar created:", avatarUrl);

    await signIn(email, password);
    console.log("Sign in successful");

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username: userName,
        avatar: avatarUrl,
      }
    );
    if (!newUser) throw new Error("User creation failed");
    console.log("User created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
};


export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    Alert.alert("Error", error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("No current account found");

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser || currentUser.documents.length === 0) {
      throw new Error("No user document found for the current account");
    }

    return currentUser.documents[0];
  } catch (error) {
    console.log("Error in getCurrentUser:", error);
    return null;
  }
};

