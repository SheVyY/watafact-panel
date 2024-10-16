import { useState } from 'react';

export function useNotification() {
    const [notification, setNotification] = useState(null);

    const showNotification = (type, message) => {
        setNotification({ type, message });
    };

    const closeNotification = () => {
        setNotification(null);
    };

    return { notification, showNotification, closeNotification };
}
