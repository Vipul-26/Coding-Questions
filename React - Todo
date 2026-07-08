import React, { useState, useEffect, useMemo } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [todos, setTodos] = useState([]);
  const [editedTitle, setEditedTitle] = useState('');
  const [isAddTodo, setIsAddTodo] = useState(false);
  const [newTodoData, setNewTodoData] = useState({
    title: '',
    completed: false,
  });
  const [searchedTitle, setSearchedTitle] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const todosJson = await response.json();
        setTodos(todosJson);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchedTitle);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchedTitle]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchedTitle, statusFilter]);

  const completedTodosList = useMemo(() => {
    return todos.filter((data) => data.completed);
  }, [todos]);

  const inProgressCount = todos.length - completedTodosList.length;

  const handleComplete = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((data) => {
        return data.id === id ? { ...data, completed: !data.completed } : data;
      });
    });
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((data) => {
        return data.id !== id;
      });
    });
  };

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditedTitle(todo.title);
  };

  const handleSave = (id) => {
    if (!editedTitle.trim()) return;
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        return todo.id === id ? { ...todo, title: editedTitle } : todo;
      });
    });
    setEditId(null);
    setEditedTitle('');
  };

  const handleAddTodo = () => {
    if (!newTodoData.title.trim()) return;

    setTodos((prevData) => {
      return [
        ...prevData,
        {
          userId: Math.floor(Math.random() * 100),
          id: Math.floor(Math.random() * 1000),
          title: newTodoData.title,
          completed: newTodoData.completed,
        },
      ];
    });
    setIsAddTodo(false);
    setNewTodoData({
      title: '',
      completed: false,
    });
  };

  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo) =>
        todo.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      .filter((todo) => {
        if (statusFilter === 'completed') return todo.completed;
        if (statusFilter === 'pending') return !todo.completed;
        return true;
      });
  }, [todos, debouncedSearch, statusFilter]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

  const paginatedTodos = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTodos.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTodos, currentPage]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!todos.length) {
    return <p>No data found</p>;
  }

  return (
    <>
      <h2>Completed: {completedTodosList.length}</h2>
      <h2>In Progress: {inProgressCount}</h2>
      <div className="mt-2 bg-purple-200 p-4">
        {isAddTodo ? (
          <div>
            <div>
              <input
                type="text"
                placeholder="Enter title"
                value={newTodoData.title}
                onChange={(e) =>
                  setNewTodoData((prevData) => {
                    return {
                      ...prevData,
                      title: e.target.value,
                    };
                  })
                }
                className="mb-2"
              />
              <p>Status:</p>
              <label>
                <input
                  type="radio"
                  name="status"
                  value={true}
                  checked={newTodoData.completed === true}
                  onChange={(e) =>
                    setNewTodoData((prevData) => {
                      return {
                        ...prevData,
                        completed: e.target.value === 'true',
                      };
                    })
                  }
                />{' '}
                true
              </label>
              <br />
              <label className="mb-2">
                <input
                  type="radio"
                  name="status"
                  value={false}
                  checked={newTodoData.completed === false}
                  onChange={(e) =>
                    setNewTodoData((prevData) => {
                      return {
                        ...prevData,
                        completed: e.target.value === 'true',
                      };
                    })
                  }
                />{' '}
                false
              </label>
            </div>
            <div>
              <button
                className="mt-2 bg-pink-200 p-2 border-2 border-solid rounded-md shadow-lg mr-2"
                onClick={() => handleAddTodo()}
                disabled={!newTodoData.title.trim()}
              >
                Add
              </button>
              <button
                className="bg-pink-200 p-2 border-2 border-solid rounded-md shadow-lg"
                onClick={() => {
                  setIsAddTodo(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            className="bg-pink-200 p-2 border-2 border-solid rounded-md shadow-lg mr-2"
            onClick={() => setIsAddTodo(true)}
          >
            Add todo
          </button>
        )}
      </div>
      <div className="p-4 my-2 bg-green-300">
        <input
          type="text"
          placeholder="Search title"
          value={searchedTitle}
          onChange={(e) => setSearchedTitle(e.target.value)}
          className="mb-2 mr-4"
        />
        <br />
        <label htmlFor="status" className="mr-2">
          Status:
        </label>
        <select
          name="status"
          id="status"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      {!filteredTodos.length && <p>No data found with searched title</p>}
      <div className="mt-2">
        {paginatedTodos.map((data) => (
          <div key={data.id} className="bg-blue-200 p-4 my-4">
            {editId === data.id ? (
              <div>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="mr-2"
                />
                <button
                  className="bg-pink-200 p-2 border-2 border-solid rounded-md shadow-lg mr-2"
                  onClick={() => handleSave(data.id)}
                  disabled={!editedTitle.trim()}
                >
                  Save
                </button>
                <button
                  className="bg-pink-200 p-2 border-2 border-solid rounded-md shadow-lg"
                  onClick={() => {
                    setEditId(null);
                    setEditedTitle('');
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <span className="mr-2">{data.title}</span>
                <button
                  className="bg-pink-200 p-2 border-2 border-solid rounded-md shadow-lg"
                  onClick={() => handleEdit(data)}
                >
                  Edit
                </button>
              </div>
            )}
            <p className="my-2">
              Status: {data.completed ? '✅ Done' : '⏳ In Progress'}
            </p>
            {!data.completed && (
              <button
                className="bg-pink-200 p-2 border-2 border-solid rounded-md shadow-lg mr-2"
                onClick={() => handleComplete(data.id)}
              >
                Mark as complete
              </button>
            )}
            <button
              className="bg-pink-200 p-2 border-2 border-solid rounded-md shadow-lg mb-2"
              onClick={() => handleDelete(data.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center my-4">
        <button
          className="bg-pink-200 p-2 border-2 border-solid rounded-md shadow-lg mr-2"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          {' '}
          Page {currentPage} of {totalPages}{' '}
        </span>
        <button
          className="bg-pink-200 p-2 border-2 border-solid rounded-md shadow-lg ml-2"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
