
import { fetchIikoPending, fetchIikoSuccess, fetchIikoError } from './userDataActions';
import {
    IIKO_LOGIN,
    IIKO_PASS,
    IIKO_ORGANIZATION_ID,
  } from "react-native-dotenv";

  import AsyncStorage from "@react-native-community/async-storage";



const generateCardNumber = (phoneNumber) => {
    let phone = phoneNumber; // 10
    phone = phone.split('+38').join('');
    let arr = [];
    for (let char of phone) {
        arr.push(char);
    }
    let cardNumber = arr[0] + arr[3] + arr[1] + arr[8] + arr[9] + arr[2] + arr[4] + arr[7] + arr[6] + arr[5]

    //console.log("arr", cardNumber)
    return cardNumber
}




const getIikoAuthToken = async () => {
    let phoneNumber = await AsyncStorage.getItem("phoneNumber");
    return fetch(
      "https://card.iiko.co.uk/api/0/auth/access_token?user_id=" +
        IIKO_LOGIN +
        "&user_secret=" +
        IIKO_PASS,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((iikoToken) => {
          
        return [phoneNumber, iikoToken];
      })
      .catch((err) => {});
  };

export const fetchUserData = () => {
    return dispatch => {
        
      console.log("dispatch START")  
      dispatch(fetchIikoPending());

      getIikoAuthToken().then((data) => {
          console.log("iikoToken 9090", data)
          return fetch(
              "https://card.iiko.co.uk/api/0/customers/get_customer_by_phone?access_token=" +
              data[1] +
              "&organization=" +
              IIKO_ORGANIZATION_ID +
              "&phone=" +
              data[0],
              {
                  method: "GET",
              }
          )
          .then((response) => response.json())
          .then((userData) => {
  
              console.log("dispatch END")
              return dispatch(fetchIikoSuccess(userData));
  
          })
          .catch((error) => {
              dispatch(fetchIikoError(error));
          });

      })
    }  
}

