import Navbar from './components/Navbar';
import './App.css'
import TableList from './components/TableList';
import ModalForm from './components/ModalForm';
import useModalFormContext from './hooks/context hooks/useModalFormContext';
import { ToastContainer } from 'react-toastify';

function App() {
  const {modalFormState} = useModalFormContext()

  return (
    <>
      {modalFormState.isOpen &&<ModalForm />}
      <Navbar />
      <TableList />
      <ToastContainer />
    </>
  )
}

export default App
