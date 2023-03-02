import { useState } from 'react';
import './Form.scss';

function Form({form, setForm, setConfirmed}) {

  const today = new Date();
  const year = String(today.getFullYear()).slice(2);
  const month = today.getMonth() + 1;

  const regexNum = /^[0-9]{16}$/;
  const regexDate = /^[0-9]{2}$/;
  const regexCVC = /^[0-9]{3}$/;

  const [eName, setEName] = useState({error: false, msg: ""});
  const [eNum, setENum] = useState({error: false, msg: ""});
  const [eDate, setEDate] = useState({errorM: false, errorY: false, msg: ""});
  const [eC, setEC] = useState({error: false, msg: ""});

  const handleChange = (e) => {
    resetError();
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }

  const handleChangeNum = (e) => {
    resetError();
    const {name, value} = e.target;
    if (value.length === 5) {
      if (value[4] !== ' ') {
        setForm({...form, [name]: value.slice(0, -1) + " " + value.slice(-1)});
      } else {
        setForm({...form, [name]: value.slice(0, -1)});
      }
    } else if (value.length === 10) {
      if (value[9] !== ' ') {
        setForm({...form, [name]: value.slice(0, -1) + " " + value.slice(-1)});
      } else {
        setForm({...form, [name]: value.slice(0, -1)});
      }
    } else if (value.length === 15) {
      if (value[14] !== ' ') {
        setForm({...form, [name]: value.slice(0, -1) + " " + value.slice(-1)});
      } else {
        setForm({...form, [name]: value.slice(0, -1)});
      }
    }
    else {
      setForm({...form, [name]: value});
    }
  }

  const handleChangeMonth = (e) => {
    resetError();
    const {name, value} = e.target;
    if (value.length === 1 && value > 0) {
      setForm({...form, [name]: '0' + value });
    } else if (value.length === 3) {
      setForm({...form, [name]: value.slice(1)});
    } else {
      setForm({...form, [name]: value});
    }
  }

  const resetError = () => {
    setEName({error: false, msg: ""});
    setENum({error: false, msg: ""});
    setEDate({errorM: false, errorY: false, msg: ""});
    setEC({error: false, msg: ""});
  }

  const checkName = () => {
    if (!form.cardName) {
      setEName({error: true, msg: "Can't be blank!"});
      return false;
    }
    return true;
  }
  const checkNum = () => {
    if (!form.cardNum) {
      setENum({error: true, msg: "Can't be blank!"});
      return false;
    } else if (!regexNum.test(form.cardNum.split(' ').join(''))) {
      setENum({error: true, msg: "Invalid format"});
      return false;
    }
    return true;
  }
  const checkDate = () => {
    if (!form.cardExpM) {
      setEDate(pre => ({...pre, errorM: true, msg: "Can't be blank!"}));
      return false;
    } else if (!form.cardExpY) {
      setEDate(pre => ({...pre, errorY: true, msg: "Can't be blank!"}));
      return false;
    } else if (!regexDate.test(form.cardExpM)) {
      setEDate(pre => ({...pre, errorM: true, msg: "Invalid format"}));
      return false;
    } else if (!regexDate.test(form.cardExpY)) {
      setEDate(pre => ({...pre, errorY: true, msg: "Invalid format"}));
      return false;
    } else if (Number(form.cardExpY) === Number(year) && Number(form.cardExpM) < month) {
      setEDate(pre => ({...pre, errorM: true, msg: "Invalid date"}));
      return false;
    } else if (Number(form.cardExpM) > 12 || Number(form.cardExpM) < 1) {
      setEDate(pre => ({...pre, errorM: true, msg: "Invalid date"}));
      return false;
    } else {
      const maxYear = Number(year) + 10;
      if ((maxYear <100 && (Number(form.cardExpY) > maxYear || Number(form.cardExpY) < Number(year))) 
            || (maxYear >= 100 && Number(form.cardExpY) > maxYear % 100 && Number(form.cardExpY) < Number(year)) ) {
        setEDate(pre => ({...pre, errorY: true, msg: "Invalid date"}));
        return false;
      }
    }
    return true;
  }
  const checkCVC = () => {
    if (!form.cardCVC) {
      setEC({error: true, msg: "Can't be blank!"});
      return false;
    } else if (!regexCVC.test(form.cardCVC)) {
      setEC({error: true, msg: "Invalid format"});
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultName = checkName();
    const resultNum = checkNum();
    const resultDate = checkDate();
    const resultCVC = checkCVC();

    if (resultName && resultNum && resultDate && resultCVC) {
      setConfirmed(true);
    }
  }

  return (
    <div className="main-form">
      <form onSubmit={handleSubmit} className="form">

        <label htmlFor="card-holder" className='label'>CARDHOLDER NAME</label>
        <div className='i-error'>
          <input 
            id="card-holder"
            className={eName.error ? 'input input-error' : 'input'}
            name="cardName"
            placeholder='e.g. Jane Appleseed'
            value={form.cardName}
            onChange={handleChange}
            maxLength="30"
          />
          {eName.error && <span className='error'>{eName.msg}</span>}
        </div>
        <label htmlFor="card-num" className='label'>CARD NUMBER</label>
        <div className='i-error'>
          <input 
            id="card-num"
            className={eNum.error ? 'input input-error' : 'input'}
            name="cardNum"
            placeholder='e.g. 1234 5678 9123 0000'
            value={form.cardNum}
            onChange={handleChangeNum}
            maxLength="19"
          />
          {eNum.error && <span className='error'>{eNum.msg}</span>}
        </div>
        <div className='form-down'>
          <div className='input-group-l'>
            <label htmlFor="card-exp-m" className='label'>EXP. DATE (MM/YY)</label>
            <div className='i-error'>
              <div className='inputs'>
                <input 
                  id="card-exp-m"
                  className={eDate.errorM ? 'input input-error' : 'input'}
                  name="cardExpM"
                  placeholder='MM'
                  value={form.cardExpM}
                  onChange={handleChangeMonth}
                  maxLength={form.cardExpM === "01" ? "3" : "2"}
                />
                <input 
                  id="card-exp-y"
                  className={eDate.errorY ? 'input input-error' : 'input'}
                  name="cardExpY"
                  placeholder='YY'
                  value={form.cardExpY}
                  onChange={handleChange}
                  maxLength="2"
                />
              </div>
              {eDate && <span className='error'>{eDate.msg}</span>}
            </div>
          </div>
          <div className='input-group-r'>
            <label htmlFor="card-cvc" className='label'>CVC</label>
            <div className='i-error'>
              <input 
                id="card-cvc"
                className={eC.error ? 'input input-error' : 'input'}
                name="cardCVC"
                placeholder='e.g. 123'
                value={form.cardCVC}
                onChange={handleChange}
                maxLength="3"
              />
              {eC.error && <span className='error'>{eC.msg}</span>}
            </div>
          </div>
        </div>
        <button type='submit' className='btn-confirm'>Confirm</button>
      </form>
    </div>
  );
}

export default Form;
