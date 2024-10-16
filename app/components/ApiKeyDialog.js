import { useState, useEffect } from 'react';

export default function ApiKeyDialog({ isOpen, onClose, onSubmit, selectedKey }) {
    const [name, setName] = useState('');
    const [limit, setLimit] = useState('');

    useEffect(() => {
        if (selectedKey) {
            setName(selectedKey.name);
            setLimit(selectedKey.limit);
        } else {
            setName('');
            setLimit('');
        }
    }, [selectedKey]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(name, limit);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">
                    {selectedKey ? 'Update API Key' : 'Create New API Key'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="API Key Name"
                        className="border p-2 mb-4 w-full"
                        required
                    />
                    <input
                        type="number"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                        placeholder="Usage Limit"
                        className="border p-2 mb-4 w-full"
                        required
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 px-4 py-2 bg-gray-200 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded"
                        >
                            {selectedKey ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
