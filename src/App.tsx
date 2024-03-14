import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ExpenseList from "./components/expense-list/ExpenseList";
import AddExpense from "./components/add-expense/AddExpense";
import SearchExpense from "./components/search-expense/SearchExpenses";
import Profile from "./components/profile/Profile";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "./components/utils/constants";
import EditExpense from "./components/edit-expense/EditExpense";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import useLocalStorage from "./custom-hooks/useLocalStorage";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  console.log(setIsLoggedIn);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");
        const { data } = await axios.get(`${BASE_API_URL}/expenses`);
        setExpenses(data);
      } catch (error) {
        console.log(error);
        setErrorMsg("Error while getting lists of expenses.Try again");
      } finally {
        setIsLoading(false);
      }
    };
    getExpenses();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh((refresh) => !refresh);
  };

  return (
    <BrowserRouter>
      <Layout isLoggedIn={isLoggedIn}>
        <Routes>
          <Route
            path="/"
            element={
              <ExpenseList
                handleRefresh={handleRefresh}
                isLoading={isLoading}
                errorMsg={errorMsg}
                expenses={expenses}
              />
            }
          />
          <Route
            path="/add"
            element={<AddExpense handleRefresh={handleRefresh} />}
          />
          <Route
            path="/edit/:id"
            element={<EditExpense handleRefresh={handleRefresh} />}
          />
          <Route
            path="/search"
            element={
              <SearchExpense
                expenses={expenses}
                isLoading={isLoading}
                errorMsg={errorMsg}
                handleRefresh={handleRefresh}
              />
            }
          />
          <Route
            path="/register"
            element={<Register setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
