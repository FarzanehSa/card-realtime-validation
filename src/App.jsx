import { useState } from 'react';
import './App.scss';
import CardFront from './CardFront';
import CardBack from './CardBack';
import Form from './Form';

function App() {
  const baseForm = {
    cardName: "",
    cardNum: "",
    cardExpM:"",
    cardExpY:"",
    cardCVC:""
  }
  const [form, setForm] = useState({...baseForm});

  return (
    <div className="app">
      <div className="main-bg"></div>
      <div className='left-side'>
        <CardFront form={form}/>
        <CardBack form={form}/>
      </div>
      <div className='right-side'>
        <Form form={form} setForm={setForm}/>
      </div>
    </div>
  );
}

export default App;
