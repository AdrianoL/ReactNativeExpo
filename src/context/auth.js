import React, { useState, useEffect, createContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState({
		user: null,
		token: ''
	});

	// Navigation
	const navigation = useNavigation();

	// Config Axios
	const token = user && user.token ? user.token : '';
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

	// Handle expired token or 401 error
	axios.interceptors.response.use(
		async function (response) {
			console.log('response');
			console.log(response);
			return response;
		},
		async function (error) {
			let res = error.response;
			console.log('res');
			console.log(res);
			if (res && res?.status === 401 && res.config && !res.config._isRetryRequest) {
				await AsyncStorage.removeItem('auth-rn');
				setUser({ user: null, token: '' });
				navigation.navigate('SignIn');
			}
		}
	);

	useEffect(() => {
		const loadFromAsyncStorage = async () => {
			let data = await AsyncStorage.getItem('auth-rn');
			if (data !== null) {
				const parsed = JSON.parse(data);
				console.log('parsed');
				console.log(parsed);
				setUser ({ ...user, firstname: parsed.firstname, lastname: parsed.lastname, email: parsed.email, role: parsed.role, image: parsed.image });
				setUser({ ...user,
					user: 'jajajaja',
					id: parsed._id,
					firstname: parsed.firstname,
					lastname: parsed.lastname,
					avatar: {
						path: parsed.path,
						upload: parsed.upload
					},
					document: parsed.document,
					address: parsed.address,
					email: parsed.email,
					phone: {
						code: parsed.code,
						number: parsed.number
					},
					accessToken: parsed.access_token,
					refreshToken: parsed.refresh_token,
				});
			} else {
				// manejar el caso cuando data es null, por ejemplo:
				console.log('No data found in AsyncStorage');
			}
		};
		loadFromAsyncStorage();
	}, []);

	return (
		<AuthContext.Provider value={[user, setUser]}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };