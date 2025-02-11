import Navbar from './components/Navbar';
import './App.css'
import TableList from './components/TableList';
import ModalForm from './components/ModalForm';
import useModalFormContext from './hooks/useModalFormContext';

function App() {
  const {modalFormState} = useModalFormContext()

  return (
    <>
      {modalFormState.isOpen &&<ModalForm />}
      <Navbar />
      <TableList />
    </>
  )
}

export default App
