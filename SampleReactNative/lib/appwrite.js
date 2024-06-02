import { Client, Account, ID, Avatars, Databases } from "react-native-appwrite";
import SignIn from "./../app/(auth)/sign-in";
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.lasa.aora",
  projectId: "6659aa00000fb675b791",
  databaseId: "6659ac5d002e68de2588",
  userCollectionId: "6659ac960032fdce128f",
  videoCollectionId: "6659acd2001c8211599b",
  storageId: "6659aedc0001398693e3",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials();
    await Signin(email, password);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function Signin(email, password) {
  try {
    // Checking for an existing session by trying to get the account details
    try {
      await account.get();
      // If the above call succeeds, it means there is an active session
      // Let's delete the current session
      await account.deleteSession("current");
    } catch (err) {
      // If getting account details fails, it means there is no active session
    }

    // Create a new session
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
}
