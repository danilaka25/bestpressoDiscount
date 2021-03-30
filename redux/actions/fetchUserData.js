
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
    let cardNumber = "0000" + arr[0] + arr[3] + arr[1] + arr[8] + arr[9] + arr[2] + arr[4] + arr[7] + arr[6] + arr[5]
    return cardNumber
}

var phoneNumber;
var iikoToken;

const getIikoAuthToken = async () => {
    phoneNumber = await AsyncStorage.getItem("phoneNumber");
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
    .then((token) => {
      iikoToken = token
    })
    .catch((err) => {});
}

const addIikoUserByPhone = (phone, token) => {
  //console.log("post user START");
  fetch(
    "https://card.iiko.co.uk/api/0/customers/create_or_update?access_token=" +
    token +
    "&organization=" +
    IIKO_ORGANIZATION_ID,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: { phone: phone, magnetCardTrack: generateCardNumber(phone) },
      }),
    }
  )
    .then((response) => response.json())
    // .then((response) => {
    //   console.log("post user", response);
    // })
    .catch((err) => {
      //console.log("error", err);
    });
};

export const fetchUserData = () => {
    return dispatch => {
        
      //console.log("dispatch START")  
      dispatch(fetchIikoPending());

      getIikoAuthToken().then(() => {

        return fetch(
              "https://card.iiko.co.uk/api/0/customers/get_customer_by_phone?access_token=" +
              iikoToken+
              "&organization=" +
              IIKO_ORGANIZATION_ID +
              "&phone=" +
              phoneNumber,
              {
                  method: "GET",
              }
          )
          .then((response) => response.json())
          .then((userData) => {
  
              if (userData.httpStatusCode == 400 && userData.code == null) {

                  // no user
                  addIikoUserByPhone(phoneNumber, iikoToken).then(()=> {

                    return fetch(
                      "https://card.iiko.co.uk/api/0/customers/get_customer_by_phone?access_token=" +
                      iikoToken+
                      "&organization=" +
                      IIKO_ORGANIZATION_ID +
                      "&phone=" +
                      phoneNumber,
                      {
                          method: "GET",
                      }
                  )
                  .then((response) => response.json())
                  .then((userData) => {
                    return dispatch(fetchIikoSuccess(userData));
                  })
                    
                  })

              }

              return dispatch(fetchIikoSuccess(userData));

          })
          .catch((error) => {
            return dispatch(fetchIikoError(error));
          });

      })
    }  
}

