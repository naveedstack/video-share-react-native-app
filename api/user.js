import { ID, Query } from "react-native-appwrite";
import { account, avatar, config, databases } from "../lib/appwrite";
import { Alert } from "react-native";

export const createUser = async ({ userName, email, password }) => {
  const newAccount = await account.create(
    ID.unique(),
    email,
    password,
    userName
  );
  if (!newAccount) throw Error;

  const avatarUrl = avatar.getInitials(userName);

  await signIn(email, password);

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
  if (!newUser) throw Error;
  return newUser;
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
    if (!currentAccount) throw Error;

    const currentUser = await databases.getDocument(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    return null
  }
};
