import './CardFront.scss';

function CardFront({form}) {
  return (
    <div className='card-front-container'>
      <div className="card-front">
        {form.cardName ?
          <span className='card-name'>{form.cardName}</span> :
          <span className='card-name'>CARDHOLDER NAME</span>
        }
        {form.cardNum ?
          <span className='card-num'>{form.cardNum}</span> :
          <span className='card-num'>0000 0000 0000 0000</span>
        }
        {form.cardExpM ?
          <span className='card-exp-m'>{form.cardExpM}/</span> :
          <span className='card-exp-m'>00/</span>
        } 
        {form.cardExpY ?
          <span className='card-exp-y'>{form.cardExpY}</span> :
          <span className='card-exp-y'>00</span>
        } 
      </div>
    </div>
  );
}

export default CardFront;
