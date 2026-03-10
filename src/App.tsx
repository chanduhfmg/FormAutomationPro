import { Form, Route, Routes } from 'react-router'
import './App.css'
import Form1 from './components/Forms/Form1'
import NewPatientForm from './components/Forms/NewPatientForm'
import TestForm from './components/Forms/TestForm'
import Home from './pages/Home'
import toast, { Toaster } from 'react-hot-toast';
import PreviewPage from './components/Forms/PreviewPage'
import Forms from './pages/Forms'

function App() {

  return (
    <>
      <Toaster />

    {/* <Form1/>
    <NewPatientForm/> */}
    {/* <TestForm/> */}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/preview' element={<PreviewPage/>}/>
      {/* <Route path='/test' element={<TestForm/>}/> */}
      <Route path='/forms' element={<Forms/>} />
    </Routes>
    </>
  )
}

export default App
