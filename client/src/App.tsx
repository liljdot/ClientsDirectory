import Navbar from './components/Navbar';
import './App.css'
import TableList from './components/TableList';
import ModalForm from './components/ModalForm';
import { useState } from 'react';

function App() {
  const [modalFormIsOpen, setModalFormIsOpen] = useState<boolean>(false)
  const [modalFormMode, setModalFormMode] = useState<"add" | "edit">("add")

  return (
    <>
      <ModalForm isOpen={modalFormIsOpen} toggleIsOpen={() => setModalFormIsOpen(prev => !prev)}/>
      <Navbar />
      <TableList />
    </>
  )
}

export default App
