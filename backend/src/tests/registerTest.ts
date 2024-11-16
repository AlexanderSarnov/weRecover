import axios, { AxiosError } from 'axios';

const testRegister = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/register', {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
        });
        console.log('Registration successful:', response.data);
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error during registration:', err.response ? err.response.data : err.message);
        } else {
            console.error('Unexpected error:', err);
        }
    }
};

testRegister();
