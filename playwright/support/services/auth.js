export const authService = (request) => {

    const createUser = async (user) => {
        return await request.post('/api/auth/register', {
            data: user
        });
    }

    const login = async (user) => {
        return await request.post('/api/auth/login', {
            data: {
                email: user.email,
                password: user.password
            }
        });
    }

    const getToken = async (user) => {
        let token;
        const response = await login(user);

        if (response.status() == 200) {
            const body = await response.json();
            token = body.data.token;
        }

        return token;
    }

    return {
        createUser,
        login,
        getToken
    }
}