import { useState } from 'react';

export function useNotification() {
    const [notification, setNotification] = useState(null);

    const showNotification = (type, message, duration = 5000) => {
        setNotification({ type, message, duration });
    };

    const closeNotification = () => {
        setNotification(null);
    };

    return { notification, showNotification, closeNotification };
}
