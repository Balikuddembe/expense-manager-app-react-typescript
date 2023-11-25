import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ExpenseList from "./components/expense-list/ExpenseList";
import AddExpense from "./components/add-expense/AddExpense";
import SearchExpense from "./components/search-expense/SearchExpense";
import Profile from "./components/profile/Profile";

const App = () => {
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<ExpenseList />}/>
        <Route path="/add" element={<AddExpense />}/>
        <Route path="/search" element={<SearchExpense />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </Layout>
    </BrowserRouter>
  );
};

export default App;