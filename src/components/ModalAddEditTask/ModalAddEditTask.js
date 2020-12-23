import './ModalAddEditTask.css';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Button,
} from 'reactstrap';
import actionTypes from '../../utils/actionTypes';

function ModalAddEditTask({
  isOpen,
  toggleIsOpen,
  contextTask,
  setContextTask,
  handleSubmit,
  handleTaskDelete,
  actionType = actionTypes.create,
}) {
  return (
    <Modal isOpen={isOpen} toggle={toggleIsOpen}>
      <ModalHeader toggle={toggleIsOpen}>
        {actionType === actionTypes.create
          ? 'Add'
          : actionType === actionTypes.update
          ? 'Edit'
          : 'Update'}{' '}
        Task
      </ModalHeader>
      <ModalBody>
        <Input
          value={contextTask.title}
          placeholder='Enter task title'
          onChange={(e) =>
            setContextTask((prev) => ({ ...prev, title: e.target.value }))
          }
          disabled={actionType === actionTypes.delete}
          id='inputTaskTitle'
          required
          className='mb-2'
        />
        <Input
          value={contextTask.description}
          type='textarea'
          placeholder='Enter task description'
          onChange={(e) =>
            setContextTask((prev) => ({ ...prev, description: e.target.value }))
          }
          disabled={actionType === actionTypes.delete}
          id='inputTaskDescription'
          required
        />
      </ModalBody>
      <ModalFooter>
        <Button color={'success'} onClick={() => handleSubmit()}>
          Submit
        </Button>
        <Button color='danger' onClick={() => handleTaskDelete()}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalAddEditTask;
