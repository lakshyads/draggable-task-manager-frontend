import './CardAddButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

/** Add button which sticks to card center-bottom border */
function CardAddButton({ handleClick }) {
  return (
    <div
      className='card-add-btn bg-warning shadow-sm pointer'
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faPlus} className='text-white ' />
    </div>
  );
}

export default CardAddButton;
