import './CardStatusBadge.css';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

/** Delete button which sticks to card center-top border */
function CardStatusBadge({ success = false, handleClick }) {
  return (
    <div
      className={classnames(
        'card-status-badge shadow-sm',
        success ? 'bg-success' : 'bg-secondary'
      )}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faCheck} className='text-white pointer' />
    </div>
  );
}

export default CardStatusBadge;
