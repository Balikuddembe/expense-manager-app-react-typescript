import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ExpenseList from "./components/expense-list/ExpenseList";
import AddExpense from "./components/add-expense/AddExpense";
import SearchExpense from "./components/search-expense/SearchExpense";
import Profile from "./components/profile/Profile";
import { useEffect, useState } from "react";
import axios from 'axios';
import { BASE_API_URL } from "./components/utils/constants";
import EditExpense from "./components/edit-expense/EditExpense";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [refresh, setRefresh]= useState(false);
  useEffect(() => {
    try {
      setIsLoading(true);
      setErrorMsg('');
      const getExpenses = async() => {
        const { data } = await axios.get(BASE_API_URL);
        console.log(data)
        setExpenses(data);
      }
      getExpenses();
    } catch(error) {
      console.log(error);
      setErrorMsg('something went wrong.Try again');
     } finally {
      setIsLoading(false);
     }
  },[refresh]);

  const handleRefresh = () => {
    setRefresh((refresh) => !refresh);
  }

  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<ExpenseList handleRefresh={handleRefresh} isLoading={isLoading} errorMsg={errorMsg} expenses={expenses}/>}/>
        <Route path="/add" element={<AddExpense handleRefresh={handleRefresh} />}/>
        <Route path="/edit/:id" element={<EditExpense handleRefresh={handleRefresh} />} />
        <Route path="/search" element={<SearchExpense />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </Layout>
    </BrowserRouter>
  );
};

export default App;
