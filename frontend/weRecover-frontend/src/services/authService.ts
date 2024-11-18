const logout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    window.location.href = '/login'; // Redirect to the login page
};

export { logout };
