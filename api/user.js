import { ID } from "react-native-appwrite";
import { account } from "../lib/appwrite";

export const createUser = ({userName, email, password}) => {
  account.create(ID.unique(), email, password, userName).then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
