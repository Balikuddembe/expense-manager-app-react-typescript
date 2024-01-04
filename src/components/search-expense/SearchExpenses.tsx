import { Form } from "react-bootstrap";
import "./SearchExpenses.css";
import ExpenseTable from "../expense-list/ExpenseTable";
import { Expense } from "../types";
import { FC, useEffect, useState } from "react";

interface SearchExpensesProps {
  expenses: Expense[];
  handleRefresh: () => void;
}

const SearchExpenses: FC<SearchExpensesProps> = ({
  expenses,
  handleRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);

  useEffect (() => {
    setFilteredExpenses(expenses);
  },[expenses]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");
    
    if(searchTerm.trim() !== '') {
      setFilteredExpenses(
        expenses.filter((expense) => 
        expense.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        );
    } else {
      setFilteredExpenses(expenses);
    }
  };
  return (
    <div>
      <div className="search-expenses">
        <h2 className="my-3 text-center">Search Expense</h2>
        <div className="search-box">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="search-input">
              <Form.Control
                type="search"
                placeholder="Enter description to search and press enter key"
                onChange={(event) => setSearchTerm(event.target.value) }
              />
            </Form.Group>
          </Form>
        </div>
        <div className="filters">
          <div className="expense-type-filter">
            <Form.Label>Expense Type</Form.Label>
            <Form.Select aria-label="Select Expense Type">
              <option value="">Select Expense Type</option>
              <option value="card">Card</option>
              <option value="cash">Cash</option>
            </Form.Select>
          </div>
          <div className="date_filter">
            <Form.Label>Expense Year</Form.Label>
            <Form.Select aria-label="Select Year">
              <option value="">Select Year</option>
              <option value="current_year">Current Year</option>
              <option value="previous_year">Previous Year</option>
            </Form.Select>
          </div>
          <div className="sort_filter">
            <Form.Label>Sort By</Form.Label>
            <Form.Select aria-label="Select Sort By">
              <option value="">Select Sort By</option>
              <option value="oldest_first">Oldest First</option>
              <option value="newest_first">Newest First</option>
            </Form.Select>
          </div>
        </div>
      </div>
      <ExpenseTable expenses={filteredExpenses} handleRefresh={handleRefresh} />
    </div>
  );
};

export default SearchExpenses;
