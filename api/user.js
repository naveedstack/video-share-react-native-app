import { ID } from "react-native-appwrite";
import { account } from "../lib/appwrite";

export const createUser = ({ email, password }) => {
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
