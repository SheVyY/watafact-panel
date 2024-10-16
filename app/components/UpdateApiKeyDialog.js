import { useState } from 'react';

export default function UpdateApiKeyDialog({ apiKey, onClose, onUpdateKey }) {
    const [name, setName] = useState(apiKey.name);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updating API key:", apiKey.id, name); // Add this log
        onUpdateKey(apiKey.id, name);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Update API Key</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="API Key Name"
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
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
