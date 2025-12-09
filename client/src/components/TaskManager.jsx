import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Button from './Button';
import Input from './Input';
import { Plus, Trash2, CheckCircle, Circle, ChevronDown, ChevronUp } from 'lucide-react';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [newDetails, setNewDetails] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/tasks');
            setTasks(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        try {
            const { data } = await api.post('/tasks', { text: newTask, details: newDetails });
            setTasks([data, ...tasks]);
            setNewTask('');
            setNewDetails('');
            setIsExpanded(false); // Close details input after adding
        } catch (error) {
            console.error(error);
        }
    };

    const toggleTask = async (id, currentStatus) => {
        try {
            const { data } = await api.put(`/tasks/${id}`, { isCompleted: !currentStatus });
            setTasks(tasks.map(task => task._id === id ? data : task));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const containerStyle = {
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        border: '1px solid #f3f4f6',
        padding: '1.5rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    };

    return (
        <div style={containerStyle}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Manage Tasks
                <span style={{ fontSize: '0.75rem', backgroundColor: '#eff6ff', color: '#2563eb', padding: '0.25rem 0.5rem', borderRadius: '9999px' }}>
                    {tasks.filter(t => !t.isCompleted).length} pending
                </span>
            </h3>

            <form onSubmit={handleAddTask} style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Input
                        placeholder="Add a new task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <Button type="submit" disabled={!newTask.trim()} style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Plus size={20} />
                    </Button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        style={{ fontSize: '0.75rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                        {isExpanded ? 'Hide Details' : 'Add Details'} {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                </div>

                {isExpanded && (
                    <div style={{ marginTop: '0.5rem' }}>
                        <textarea
                            placeholder="Add extra details..."
                            value={newDetails}
                            onChange={(e) => setNewDetails(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.375rem',
                                fontSize: '0.875rem',
                                minHeight: '4rem'
                            }}
                        />
                    </div>
                )}
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, overflowY: 'auto' }}>
                {tasks.length > 0 ? tasks.map(task => (
                    <div key={task._id} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '0.5rem',
                        transition: 'opacity 0.2s',
                        opacity: task.isCompleted ? 0.6 : 1
                    }}>
                        <button onClick={() => toggleTask(task._id, task.isCompleted)}>
                            {task.isCompleted ? <CheckCircle size={20} color="#10b981" /> : <Circle size={20} color="#9ca3af" />}
                        </button>
                        <div style={{ flex: 1 }}>
                            <p style={{
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                color: task.isCompleted ? '#6b7280' : '#111827',
                                textDecoration: task.isCompleted ? 'line-through' : 'none',
                                marginBottom: task.details ? '0.25rem' : 0
                            }}>
                                {task.text}
                            </p>
                            {task.details && (
                                <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{task.details}</p>
                            )}
                        </div>
                        <button onClick={() => deleteTask(task._id)} style={{ color: '#ef4444' }}>
                            <Trash2 size={16} />
                        </button>
                    </div>
                )) : (
                    <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem', marginTop: '2rem' }}>No tasks yet.</p>
                )}
            </div>
        </div>
    );
};

export default TaskManager;
