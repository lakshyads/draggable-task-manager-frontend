import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
// import components
import UserBoard from '../../components/UserBoard/UserBoard';
import Task from '../../components/Task/Task';
import ModalAddEditUser from '../../components/ModalAddEditUser/ModalAddEditUser';
import ModalAddEditTask from '../../components/ModalAddEditTask/ModalAddEditTask';
import * as backend from '../../hooks/httpHooks';
import actionTypes from '../../utils/actionTypes';

/**
 * Render task-view screen
 */
function TaskView() {
  /**** Page controls ******************************************************************************************/

  const userUrl = '/user';
  const taskUrl = '/task';
  const [userList, setUserList] = useState([]);
  const [taskList, setTaskList] = useState([]);

  /*************************************************************************************************************/
  /**** User Data fetch controls *******************************************************************************/

  // fetch users
  const [doFetchUsers, setDoFetchUsers] = useState(true);
  useEffect(() => {
    if (doFetchUsers)
      backend.get(userUrl).then((response) => setUserList(response.data));
    return () => setDoFetchUsers(false);
  }, [doFetchUsers, userList]);

  // fetch tasks
  const [doFetchTasks, setDoFetchTasks] = useState(true);
  useEffect(() => {
    if (doFetchTasks)
      backend.get(taskUrl).then((response) => setTaskList(response.data));
    return () => setDoFetchTasks(false);
  }, [doFetchTasks, taskList]);

  /*************************************************************************************************************/
  /**** User modal controls ************************************************************************************/

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [contextUser, setContextUser] = useState({ _id: null, name: '' });
  const [contextUserActionType, setContextUserActionType] = useState(false);
  const toggleUserModal = () => {
    if (isUserModalOpen) resetUserModal();
    setIsUserModalOpen(!isUserModalOpen);
  };
  const resetUserModal = () => setContextUser({ _id: null, name: '' });
  const handleUserBoardDelete = () => {
    setContextUserActionType(actionTypes.delete);
    toggleUserModal();
  };
  const handleUserBoardEdit = () => {
    setContextUserActionType(actionTypes.update);
    toggleUserModal();
  };
  // handles create, update, delete user
  const submitUserModal = () => {
    switch (contextUserActionType) {
      case actionTypes.create:
        backend.post(userUrl, contextUser).then((response) => {
          if (response.success) setDoFetchUsers(true);
        });
        break;
      case actionTypes.update:
        backend.update(userUrl, contextUser).then((response) => {
          if (response.success) setDoFetchUsers(true);
        });
        break;
      case actionTypes.delete:
        backend.remove(userUrl, contextUser).then((response) => {
          if (response.success) setDoFetchUsers(true);
        });
        break;
      default:
        break;
    }
    toggleUserModal();
  };

  /*************************************************************************************************************/
  /**** Task modal controls ************************************************************************************/

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [contextTask, setContextTask] = useState({
    _id: null,
    title: '',
    description: '',
    user: '',
    isDone: false,
  });
  const [contextTaskActionType, setContextTaskActionType] = useState(false);
  const toggleTaskModal = () => {
    if (isTaskModalOpen) resetTaskModal();
    setIsTaskModalOpen(!isTaskModalOpen);
  };
  const resetTaskModal = () =>
    setContextTask({
      _id: null,
      title: '',
      description: '',
      user: '',
    });
  const handleTaskDelete = () => {
    setContextTaskActionType(actionTypes.delete);
    toggleTaskModal();
  };
  const handleTaskEdit = () => {
    setContextTaskActionType(actionTypes.update);
    toggleTaskModal();
  };
  const toggleIsTaskDone = (task) => {
    // setContextTask((prev) => ({ ...prev, isDone: !contextTask.isDone }));
    backend
      .update(taskUrl, { ...task, isDone: !task.isDone })
      .then((response) => {
        if (response.success) setDoFetchTasks(true);
      });
  };
  // handles create, update, delete task
  const submitTaskModal = () => {
    // setContextTask((prev) => ({ ...prev, user: contextUser._id }));
    switch (contextTaskActionType) {
      case actionTypes.create:
        backend.post(taskUrl, contextTask).then((response) => {
          if (response.success) setDoFetchTasks(true);
        });
        break;
      case actionTypes.update:
        backend.update(taskUrl, contextTask).then((response) => {
          if (response.success) setDoFetchTasks(true);
        });
        break;
      case actionTypes.delete:
        backend.remove(taskUrl, contextTask).then((response) => {
          if (response.success) setDoFetchTasks(true);
        });
        break;
      default:
        break;
    }
    toggleTaskModal();
  };

  /************************************************************************************************************/
  /************************************************************************************************************/

  return (
    <Container fluid className='p-5'>
      {/* User Modal */}
      <ModalAddEditUser
        isOpen={isUserModalOpen}
        toggleIsOpen={toggleUserModal}
        contextUser={contextUser}
        setContextUser={setContextUser}
        handleSubmit={submitUserModal}
        actionType={contextUserActionType}
      />
      <ModalAddEditTask
        isOpen={isTaskModalOpen}
        toggleIsOpen={toggleTaskModal}
        contextTask={contextTask}
        setContextTask={setContextTask}
        handleSubmit={submitTaskModal}
        actionType={contextTaskActionType}
        handleTaskDelete={handleTaskDelete}
      />
      {/* TaskView header section */}
      <Row className='mb-5'>
        <Col>
          <h2>Task Manager</h2>
          <h5>By Lakshya Dev Singh</h5>
          <hr />
        </Col>
        <div className='ml-auto mt-auto'>
          <Button
            color='info'
            onClick={() => {
              setContextUserActionType(actionTypes.create);
              toggleUserModal();
            }}
          >
            Add User
          </Button>
        </div>
      </Row>
      {/* User Boards section */}
      <Row>
        {userList &&
          userList.map((user, index) => (
            <Col md='6' lg='4' xl='3' key={user._id + index}>
              <UserBoard
                user={user}
                handleUserBoardDelete={handleUserBoardDelete}
                handleUserBoardEdit={handleUserBoardEdit}
                setContextUser={setContextUser}
                handleAddTask={() => {
                  setContextTask((prev) => ({ ...prev, user: user._id }));
                  setContextTaskActionType(actionTypes.create);
                  toggleTaskModal();
                }}
              >
                {taskList &&
                  taskList
                    .filter((task) => task.user === user._id)
                    .filter((task) => !task.isDone)
                    .map((task, index) => (
                      <Task
                        task={task}
                        handleTaskEdit={() => {
                          setContextTask(task);
                          handleTaskEdit();
                        }}
                        handleTaskDelete={handleTaskDelete}
                        toggleIsTaskDone={() => {
                          //   setContextTask(task);
                          toggleIsTaskDone(task);
                        }}
                        key={task._id + index}
                      />
                    ))}
                <Row>
                  <Col
                    xs='2'
                    style={{ fontSize: 'x-small' }}
                    className='pr-0 mr-0 pt-2'
                  >
                    Done
                  </Col>
                  <Col xs='10' className='ml-0 pl-0'>
                    <hr />
                  </Col>
                </Row>
                {taskList &&
                  taskList
                    .filter((task) => task.user === user._id)
                    .filter((task) => task.isDone)
                    .map((task, index) => (
                      <Task
                        task={task}
                        handleTaskEdit={() => {
                          setContextTask(task);
                          handleTaskEdit();
                        }}
                        handleTaskDelete={handleTaskDelete}
                        toggleIsTaskDone={() => {
                          //   setContextTask(task);
                          toggleIsTaskDone(task);
                        }}
                        key={task._id + index}
                      />
                    ))}
              </UserBoard>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default TaskView;
