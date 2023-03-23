import { API, Auth } from "aws-amplify";
import { v4 as uuid } from "uuid";

const apiName = "reactBankingApi";
const path = "/transaction";

//add a user based on cognito id
const createUser = async () => {
    return new Promise((resolve, reject) => {
      const accountNumber = uuid();
      Auth.currentUserInfo().then(async (userID) => {
        try {
          const response = await API.post(apiName, path, {
            body: {
              userID: userID["id"],
              accountNumber: accountNumber,
              balance: 5000,
              transactions: [],
            },
          });
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    });
  };

//get user info from bankingDB based on cognito id
const getUser = async () => {
    return new Promise((resolve, reject) => {
        Auth.currentUserInfo().then(async (userID) => {

            try {
                const response = await API.get(apiName, `${path}/${userID["id"]}`);
                resolve(response[0]);
            } catch (error) {
                reject(error);
            }
        });
    });
};

//deposit or withdraw
const transaction = async (amount) => {
    return new Promise((resolve, reject) => {
        const transactionType = amount < 0 ? "withdraw" : "deposit";

        getUser().then(async (userInfo) => {
            if (amount < 0 && userInfo["balance"] + amount < 0) {
                reject({ error: "Insufficient Funds." });
            } else {
                //update user balance and append the transaction to transaction list
                const newTransaction = {
                    data: new Date().toString(),
                    amount: amount < 0 ? amount * -1 : amount,
                    type: transactionType,
                };

                userInfo["transactions"].push(newTransaction);
                userInfo["balance"] += amount;

                const response = await API.put(apiName, path, {
                    body: {
                        userID: userInfo["userID"],
                        balance: userInfo["balance"],
                        accountNumber: userInfo["accountNumber"],
                        transactions: userInfo["transactions"],
                    },
                });

                if (response.hasOwnProperty("success")) {
                    console.log(response);
                    resolve({ message: "Transaction successful." });
                } else {
                    reject({ message: response["error"] });
                }
            }
        });
    });
};

export { createUser, getUser, transaction };
