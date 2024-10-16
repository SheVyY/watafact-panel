import { useState } from 'react';
import { EyeIcon, EyeSlashIcon, ClipboardIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const ApiKeysTable = ({ apiKeys, onUpdateKey, onDeleteKey, onCopyKey }) => {
    const [visibleKeyId, setVisibleKeyId] = useState(null);

    const toggleKeyVisibility = (id) => {
        setVisibleKeyId(visibleKeyId === id ? null : id);
    };

    const maskKey = (key) => {
        return `tvly-${'*'.repeat(32)}`;
    };

    return (
        <table className="w-full">
            <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-2">NAME</th>
                    <th className="pb-2">USAGE</th>
                    <th className="pb-2">KEY</th>
                    <th className="pb-2">OPTIONS</th>
                </tr>
            </thead>
            <tbody>
                {apiKeys.map((apiKey) => (
                    <tr key={apiKey.id} className="border-b">
                        <td className="py-3">{apiKey.name}</td>
                        <td className="py-3">
                            <span className="bg-gray-200 rounded-full px-2 py-1 text-xs">0%</span>
                        </td>
                        <td className="py-3">
                            <span className="font-mono font-bold">
                                {visibleKeyId === apiKey.id ? apiKey.key : maskKey(apiKey.key)}
                            </span>
                        </td>
                        <td className="py-3 flex items-center space-x-2">
                            <button onClick={() => toggleKeyVisibility(apiKey.id)}>
                                {visibleKeyId === apiKey.id
                                    ? <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                                    : <EyeIcon className="h-5 w-5 text-gray-600" />
                                }
                            </button>
                            <button onClick={() => onCopyKey(apiKey.key)}>
                                <ClipboardIcon className="h-5 w-5 text-gray-600" />
                            </button>
                            <button onClick={() => onUpdateKey(apiKey)}>
                                <PencilIcon className="h-5 w-5 text-gray-600" />
                            </button>
                            <button onClick={() => onDeleteKey(apiKey.id)}>
                                <TrashIcon className="h-5 w-5 text-gray-600" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ApiKeysTable;