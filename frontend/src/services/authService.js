// Service d'authentification pour le frontend
export async function loginUser(username, password) {
	const response = await fetch('http://localhost:8000/users/login/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, password })
	});
	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.error || 'Login failed');
	}
	return response.json();
}
