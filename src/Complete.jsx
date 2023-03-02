import { ReactComponent as Done } from './icon-complete.svg';
import './Complete.scss';

function Complete({baseForm, setForm, setConfirmed}) {

  const handleClick = () => {
    setConfirmed(false);
    setForm({...baseForm});
  }

  return (
    <div className='complete-page'>
      <Done className="done-logo"/>
      <span className='title'>THANK YOU!</span>
      <span className='text'>We've added your card details.</span>
      <button className='btn-continue' onClick={handleClick}>Continue</button>
    </div>
  );
}

export default Complete;
