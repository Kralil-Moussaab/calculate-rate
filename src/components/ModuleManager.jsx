import React, { useState } from 'react';

export default function ModuleManager() {
    const [modules, setModules] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editValues, setEditValues] = useState({ note: '', coef: '' });

    const addModule = () => {
        setModules([...modules, { note: '', coef: '' }]);
    };

    const deleteModule = (index) => {
        setModules(modules.filter((_, i) => i !== index));
    };

    const calculateMoyenne = () => {
        let totalSum = 0;
        let totalCoefSum = 0;

        modules.forEach((module) => {
            const note = parseFloat(module.note) || 0;
            const coef = parseFloat(module.coef) || 0;
            totalSum += note * coef;
            totalCoefSum += coef;
        });

        const moyenne = totalCoefSum ? (totalSum / totalCoefSum).toFixed(2) : 0;
        alert(`Moyenne: ${moyenne}`);
    };

    const handleInputChange = (index, field, value) => {
        const updatedModules = modules.map((module, i) =>
            i === index ? { ...module, [field]: value } : module
        );
        setModules(updatedModules);
    };

    const handleEditModule = (index) => {
        setEditMode(true);
        setEditIndex(index);
        setEditValues(modules[index]);
    };

    const saveEditedModule = () => {
        const updatedModules = modules.map((module, i) =>
            i === editIndex ? { ...editValues } : module
        );
        setModules(updatedModules);
        setEditMode(false);
        setEditIndex(null);
    };

    return (
        <div className="flex flex-col items-center p-4">
            <button
                onClick={addModule}
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
            >
                Add Module
            </button>
            <button
                onClick={calculateMoyenne}
                className="bg-green-500 text-white py-2 px-4 rounded mb-4"
            >
                Calculate Moyenne
            </button>

            <div className="w-full max-w-md">
                {modules.map((module, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-3 gap-2 mb-4 p-4 bg-gray-100 rounded shadow"
                    >
                        <input
                            type="text"
                            placeholder="Note"
                            value={module.note}
                            onChange={(e) =>
                                handleInputChange(index, 'note', e.target.value)
                            }
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Coef"
                            value={module.coef}
                            onChange={(e) =>
                                handleInputChange(index, 'coef', e.target.value)
                            }
                            className="p-2 border rounded"
                        />
                        <div className="flex space-x-2">
                            <button
                                onClick={() => deleteModule(index)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => handleEditModule(index)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {editMode && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                        <h2 className="text-lg font-bold mb-4">Edit Module</h2>
                        <input
                            type="text"
                            placeholder="Note"
                            value={editValues.note}
                            onChange={(e) =>
                                setEditValues({ ...editValues, note: e.target.value })
                            }
                            className="p-2 mb-4 border rounded w-full"
                        />
                        <input
                            type="text"
                            placeholder="Coef"
                            value={editValues.coef}
                            onChange={(e) =>
                                setEditValues({ ...editValues, coef: e.target.value })
                            }
                            className="p-2 mb-4 border rounded w-full"
                        />
                        <button
                            onClick={saveEditedModule}
                            className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditMode(false)}
                            className="bg-gray-500 text-white py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
