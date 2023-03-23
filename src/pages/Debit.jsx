import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { getUser, createUser, transaction } from "../api/transactions";

const Debit = ({ type }) => {
    const [amount, setAmount] = useState(0);
    const [validType, setValidType] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!amount) {
            setMessage("Please set an amount.");
        } else if (+amount === NaN) {
            setMessage("Please insert a valid number for amount.");
        } else {
            const res = await transaction(+amount);
            setMessage(res['message']);
        }
    };

    useEffect(() => {
        setValidType(
            type &&
                (type.toLowerCase() === "deposit" ||
                    type.toLowerCase() === "withdraw")
        );
    }, []);

    return (
        <div className=" flex justify-top text-center items-center flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-screen">
            {" "}
            {validType && (
                <div>
                    <form className="p-3 [&>*]:p-3">
                        <div className=" capitalize text-lg">{type}</div>
                        <div>
                            <label>Amount:</label>
                            <input
                                className=" bg-gray-100"
                                type="number"
                                min="0"
                                name="amount"
                                required
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                className=" capitalize bg-red-200 hover:bg-red-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Confirm {type}
                            </button>
                        </div>
                    </form>
                    <div>{message}</div>
                </div>
            )}{" "}
            {!validType && <div>Error: Not a valid transaction type.</div>}
        </div>
    );
};

export default withAuthenticator(Debit);
