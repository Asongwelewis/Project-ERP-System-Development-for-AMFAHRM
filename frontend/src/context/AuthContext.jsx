import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);

	const login = (userData) => {
		setUser(userData);
		// Optionally, store user in localStorage/sessionStorage for persistence
	};

	const logout = () => {
		setUser(null);
		// Optionally, remove user from storage
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
