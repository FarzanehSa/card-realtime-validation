import { useState } from 'react';
import './App.scss';
import CardFront from './CardFront';
import CardBack from './CardBack';
import Form from './Form';
import Complete from './Complete';

function App() {
  const baseForm = {
    cardName: "",
    cardNum: "",
    cardExpM:"",
    cardExpY:"",
    cardCVC:""
  }
  const [form, setForm] = useState({...baseForm});
  const [confirmed, setConfirmed] = useState(false)

  return (
    <div className="app">
      <div className="main-bg"></div>
      <div className='left-side'>
        <CardFront form={form} />
        <CardBack form={form} />
      </div>
      <div className='right-side'>
        {confirmed ?
          <Complete baseForm={baseForm} setForm={setForm} setConfirmed={setConfirmed}/> :
          <Form form={form} setForm={setForm} setConfirmed={setConfirmed}/>
        }
      </div>
    </div>
  );
}

export default App;
