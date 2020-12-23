import classnames from 'classnames';
import './UserBoard.css';
// Import components
import { Card, CardBody, CardHeader } from 'reactstrap';
import CardDeleteButton from '../CardDeleteButton/CardDeleteButton';
import CardAddButton from '../CardAddButton/CardAddButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

/**
 * User Board Card
 * @prop userName
 * @prop handleAddTask
 * @prop handleUserBoardDelete
 */
function UserBoard({
  user,
  handleUserBoardDelete,
  handleUserBoardEdit,
  setContextUser,
  handleAddTask,
  ...props
}) {
  return (
    <div className='user-board-card'>
      <Card className={classnames('shadow')}>
        <CardDeleteButton
          handleClick={() => {
            setContextUser(user);
            handleUserBoardDelete();
          }}
        />
        <CardAddButton handleClick={handleAddTask} />
        <CardHeader className='bg-dark text-white'>
          <FontAwesomeIcon
            icon={faPen}
            color='info'
            className='text-white mr-1 board-edit-icon'
            onClick={() => {
              setContextUser(user);
              handleUserBoardEdit();
            }}
          />
          {user.name}
        </CardHeader>
        <CardBody>
          {props.children || (
            <div className='text-muted h-3'>Add tasks to this card</div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default UserBoard;
