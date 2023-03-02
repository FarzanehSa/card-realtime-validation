import './CardBack.scss';

function CardBack({form}) {
  return (
    <div className='card-back-container'>
      <div className="card-back">
        {form.cardCVC ? 
          <span className='card-cvc'>{form.cardCVC}</span> :
          <span className='card-cvc'>000</span>
        }
      </div>
    </div>
  );
}

export default CardBack;