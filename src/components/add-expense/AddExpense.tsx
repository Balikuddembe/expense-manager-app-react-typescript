import axios from 'axios'
import ExpenseForm from '../expense-form/ExpenseForm'
import { BASE_API_URL } from '../utils/constants'
import { Expense } from '../types'
import { FC } from 'react';

interface AddExpenseProps {
  handleRefresh: () => void;
}
const AddExpense:FC<AddExpenseProps> = ({handleRefresh}) => {
  const handleSubmit = async (inputData:Expense): Promise<boolean> => {
    try {
      const { data } = await axios.post(`${BASE_API_URL}/expenses`, {
        ...inputData
      });
      console.log('posting', data);
      handleRefresh();
      return true;
    } catch (error) {  
      console.log(error);
      return false;
    }
  }
  return (
    <div className='main-content'>
      <h2 className='my-2 text-center'>Add Expense</h2>
      <ExpenseForm onSubmitForm={handleSubmit} /> 
    </div>
  )
}

export default AddExpense