import { Account, Client, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "6766a4b8000852492b0a",
  platformId: "com.naveed_dev.vshare",
  databaseId: "6766a6ea002c6e5a4d16",
  userCollectionId: "6766a70b0022ac6334d6",
  videoCollectionId: "6766a7250034e664a104",
  storageId: "6766a8dc001dcd58c3d0",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platformId);

export const account = new Account(client);