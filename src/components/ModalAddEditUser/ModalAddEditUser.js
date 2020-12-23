import './ModalAddEditUser.css';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Button,
} from 'reactstrap';
import actionTypes from '../../utils/actionTypes';

function ModalAddEditUser({
  isOpen,
  toggleIsOpen,
  contextUser,
  setContextUser,
  handleSubmit,
  actionType = actionTypes.create,
}) {
  return (
    <Modal isOpen={isOpen} toggle={toggleIsOpen}>
      <ModalHeader toggle={toggleIsOpen}>
        {actionType === actionTypes.create
          ? 'Add'
          : actionType === actionTypes.update
          ? 'Edit'
          : 'Delete'}{' '}
        User
      </ModalHeader>
      <ModalBody>
        <Input
          value={contextUser.name}
          placeholder='Enter user name'
          onChange={(e) =>
            setContextUser((prev) => ({ ...prev, name: e.target.value }))
          }
          disabled={actionType === actionTypes.delete}
          id='inputUserName'
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color={actionType === actionTypes.delete ? 'danger' : 'success'}
          onClick={() => handleSubmit()}
        >
          {actionType === actionTypes.delete ? 'Delete' : 'Submit'}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalAddEditUser;
