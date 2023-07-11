import React, { useState, useEffect } from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'

function TodoList() {
    const [todos,setTodos] = useState([])

    useEffect(() => {
        window.localStorage.setItem( 'my-todo-list', JSON.stringify(todos))
    }, [todos])

    useEffect(() => {
        const data = window.localStorage.getItem('my-todo-list');
        if ( data !== null ) setTodos(JSON.parse(data))
        console.log(JSON.parse(data))
    }, [])


    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos]

        setTodos(newTodos)
    };

    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
    }

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)

        setTodos(removeArr)
    };

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if(todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };
 
    return (
        <div>
            <h1>What's the Plan for Today</h1>
            <TodoForm onSubmit={addTodo}/>
            <Todo 
                todos={todos} 
                completeTodo={completeTodo} 
                removeTodo={removeTodo} 
                updateTodo={updateTodo}
            />
        </div>
  );
}

export default TodoList