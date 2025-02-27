import Auth from '../utils/auth';

const retrieveUsers = async () => {
    try {
        const response = await fetch('/api/users', {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to retrieve users with retrieveUsers() from userAPI.tsx');
        }
    } catch (error) {
        console.error('Error retrieving users (userAPI.tsx): ', error);
    }
}

export { retrieveUsers };