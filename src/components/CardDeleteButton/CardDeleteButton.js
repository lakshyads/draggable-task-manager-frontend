import './CardDeleteButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

/** Delete button which sticks to card center-top border */
function CardDeleteButton({ handleClick }) {
  return (
    <div
      className='card-delete-btn bg-danger shadow-sm pointer'
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faTrashAlt} className='text-white ' />
    </div>
  );
}

export default CardDeleteButton;
