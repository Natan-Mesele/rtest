import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProject } from '../Redux/Project/Action';

const ProjectForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProject = { name, description, category };
        dispatch(createProject(newProject)); 
        onSubmit(newProject); 
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-4">
                <label className="block text-gray-600">Project Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-600">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-600">Category</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
};

export default ProjectForm;
