interface UserCredentials {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const loginUser = async (
  email: string,
  password: string,
): Promise<UserCredentials> => {
  try {
    const response = await fetch('http://192.168.1.35:5001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }

    const data: UserCredentials = await response.json();
    console.log('Login successful:', data);
    return data; // token and user info
  } catch (error: any) {
    console.error('Login error:', error.message);
    throw error;
  }
};
