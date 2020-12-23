import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
// import components
import UserBoard from '../../components/UserBoard/UserBoard';
import Task from '../../components/Task/Task';
import ModalAddUser from '../../components/ModalAddUser/ModalAddUser';
import ModalAddUpdateTask from '../../components/ModalAddUpdateTask/ModalAddUpdateTask';
import * as backend from '../../hooks/httpHooks';

/**
 * Render task-view screen
 */
function TaskView() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      user: 'Lakshya Dev',
      title: 'Task Title',
      description: '',
      isTaskDone: false,
    },
    {
      id: 2,
      user: 'Lakshya Dev',
      title: 'Another Task Title',
      description: 'Task with description.',
      isTaskDone: true,
    },
    {
      id: 3,
      user: 'Gitika Singh',
      title: 'Yet Another Task Title',
      description:
        'Task with really really long description. Infact description is very long.',
      isTaskDone: false,
    },
  ]);
  // Modal
  const [addUser, setAddUser] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [userForAddTask, setUserForAddTask] = useState('');
  // Toggle handlers for modal
  const toggleAddUser = () => setAddUser(!addUser);
  const toggleAddUpdateTask = (user) => {
    setUserForAddTask(addTask ? '' : user);
    setAddTask(!addTask);
  };

  const [mounted, setMounted] = useState(true);
  // load user data from backend
  useEffect(() => {
    (async () => {
      if (mounted) {
        const data = await backend.get('/user');
        setUsers(data.data);
      }
    })();
    return () => setMounted(false);
  }, [users, mounted]);

  /**
   * Add task to a user board
   * @param {*} user Name of User to add task for
   */
  const handleAddTask = (title, description) => {
    setTasks((prevTasks) =>
      prevTasks.concat({
        user: userForAddTask,
        title: title,
        description: description,
        isTaskDone: false,
      })
    );
  };

  const handleUpdateTask = (title, description) => {
    setTasks((prevTasks) =>
      prevTasks.concat({
        user: userForAddTask,
        title: title,
        description: description,
        isTaskDone: false,
      })
    );
  };

  /**
   * Toggle task status
   * @param {*} id Id of task to toggle status for
   */
  const handleIsTaskDone = (id) => {};

  /**
   * Add new user board
   * @param {*} name Name of user to add
   */
  const handleAddUser = (name) => {
    setUsers((prevUsers) => prevUsers.concat({ name: name }));
  };

  /**
   * Delete a user board
   * @param {*} user User name of board to delete
   */
  const handleUserBoardDelete = (id) => {
    backend.remove('/user', { _id: id }).then(
      (data) => {
        if (data.success)
          setUsers((prevUsers) =>
            prevUsers.filter((prevUser) => prevUser._id !== id)
          );
      },
      (error) => {
        // Handle error
      }
    );
  };

  return (
    <Container fluid className='p-5'>
      <ModalAddUser
        addUser={addUser}
        toggleAddUser={toggleAddUser}
        handleAddUser={handleAddUser}
      />
      <ModalAddUpdateTask
        addTask={addTask}
        toggleAddUpdateTask={toggleAddUpdateTask}
        handleAddTask={handleAddTask}
        handleUpdateTask={handleUpdateTask}
      />
      <Row className='mb-5'>
        <Col>
          <h2>Task Manager</h2>
          <h5>By Lakshya Dev Singh</h5>
          <hr />
        </Col>
        <div className='ml-auto mt-auto'>
          <Button color='info' onClick={toggleAddUser}>
            Add User
          </Button>
        </div>
      </Row>
      <Row>
        {users &&
          // console.log('users:', users) &&
          // users.length > 0 &&
          users.map((user, index) => (
            <Col md='6' lg='4' xl='3' key={user.name + index}>
              <UserBoard
                user={user}
                toggleAddUpdateTask={toggleAddUpdateTask}
                handleUserBoardDelete={handleUserBoardDelete}
              >
                {tasks &&
                  tasks
                    .filter((task) => task.user === user.name)
                    .map((task, index) => (
                      <Task
                        setisTaskDone={handleIsTaskDone}
                        {...task}
                        key={task.title + index}
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
