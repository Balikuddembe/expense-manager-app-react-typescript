import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExpenseForm from "../expense-form/ExpenseForm";
import axios from "axios";
import { BASE_API_URL } from "../utils/constants";
import { Expense } from "../types";

interface EditExpenseProps {
    handleRefresh: () => void;
}
const EditExpense: FC<EditExpenseProps> = ({handleRefresh}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expense, setExpense] = useState(null);
  // extrct id from url
  const { id } = useParams();
  useEffect(() => {
    const getExpense = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");
        const { data } = await axios.get(`${BASE_API_URL}/${id}`);
        setExpense(data);
        console.log("expense", data);
      } catch (error) {
        console.log(error);
        setErrorMsg("Error while loading expense data.Try again");
      } finally {
        setIsLoading(false);
      }
    };
    getExpense();
  }, [id]);

  // update data
  const handleSubmit = async (inputData: Expense): Promise<boolean> => {
    try{
        const {data} = await axios.patch(`${BASE_API_URL}/${id}`, {
            ...inputData
        });
        handleRefresh();
        console.log('update', data);
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
    return true;
  };
  return (
    <div className="main-content">
      <h2 className="my-3 text-center">Edit Expense</h2>
      {isLoading && <p className="loading">Loading...</p>}
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      <ExpenseForm onSubmitForm={handleSubmit} expense={expense} />
    </div>
  );
};

export default EditExpense;
