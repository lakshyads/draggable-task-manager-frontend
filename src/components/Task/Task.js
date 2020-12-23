import classnames from 'classnames';
import './Task.css';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import CardStatusBadge from '../CardStatusBadge/CardStatusBadge';

function Task({ task, toggleIsTaskDone, handleTaskEdit }) {
  return (
    <div className='task-card'>
      <Card className={classnames('shadow-sm bg-white ')}>
        <CardBody>
          <CardStatusBadge
            success={task.isDone}
            handleClick={toggleIsTaskDone}
          />
          {task.title && (
            <CardTitle className='text-dark' onClick={handleTaskEdit}>
              {task.title}
            </CardTitle>
          )}
          {task.description && (
            <CardText className='text-muted' onClick={handleTaskEdit}>
              {task.description}
            </CardText>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Task;
