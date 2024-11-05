import React, { useState, useEffect } from 'react';
import ProjectForm from './ProjectForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/Auth/Action';
import { fetchProjects, createProject } from '../Redux/Project/Action';

const HomePage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const projects = useSelector((state) => state.project.projects) || [];

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const handleAddProject = async (newProject) => {
        await dispatch(createProject(newProject)); 
        setIsModalVisible(false); 
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Project List</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            <div className="text-center mb-8">
                <button
                    onClick={() => setIsModalVisible(true)}
                    className="text-blue-500 underline"
                >
                    Add New Project
                </button>
            </div>

            {/* Project List */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <div key={project.id} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">{project.name}</h2>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                    </div>
                ))}
            </div>

            {/* Modal for Project Form */}
            {isModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">New Project</h2>
                        <ProjectForm onSubmit={handleAddProject} />
                        <button
                            onClick={() => setIsModalVisible(false)}
                            className="mt-4 text-red-500 hover:underline"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
