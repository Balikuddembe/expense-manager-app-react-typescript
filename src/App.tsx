import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ExpenseList from "./components/expense-list/ExpenseList";
import AddExpense from "./components/add-expense/AddExpense";
import SearchExpense from "./components/search-expense/SearchExpense";
import Profile from "./components/profile/Profile";
import { useEffect, useState } from "react";
import axios from 'axios';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  useEffect(() => {
    try {
      setIsLoading(true);
      setErrorMsg('');
      const getExpenses = async() => {
        const { data } = await axios.get('http://localhost:4000/expenses');
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
  },[]);

  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<ExpenseList isLoading={isLoading} errorMsg={errorMsg} expenses={expenses}/>}/>
        <Route path="/add" element={<AddExpense />}/>
        <Route path="/search" element={<SearchExpense />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </Layout>
    </BrowserRouter>
  );
};

export default App;
