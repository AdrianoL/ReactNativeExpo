import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useContext, handleSubmit } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from '../context/auth';

import MaterialTextInput from '../components/utils/MaterialTextInput';  // Asegúrate de importar correctamente

const SignUp = ({ navigation }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [state, setState] = useContext(AuthContext);

	const handleSubmit = async () => {
		if (name === '' || email === '' || password === '') {
			alert('All fields are required');
			return;
		}
		const resp = await axios.post('http://localhost:3000/users/register', { name, email, password });
		console.log(resp.data)
		if (resp.data.error) {
			alert(resp.data.error);
		} else {
			setState(resp.data);
			await AsyncStorage.setItem('auth-rn', JSON.stringify(resp.data));
			alert('Sign Up Successful');
			navigation.navigate('Home');
		}
	}

	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.container}>
			<View style={{ marginVertical: 100 }}>
				<View style={styles.imageContainer}>
					<Image source={require('../assets/leon-libertario.png')} style={styles.imageStyles} />
				</View>
				<MaterialTextInput 
					label="NOMBRE" 
					value={name} 
					onChangeText={setName} 
					autoCapitalize='words' 
					autocorrect={false} 
				/>
				<MaterialTextInput 
					label="EMAIL" 
					value={email} 
					onChangeText={setEmail} 
					autoCompleteType='email' 
					keyboardType='email-address'
				/>
				<MaterialTextInput 
					label="CONTRASEÑA" 
					value={password} 
					onChangeText={setPassword} 
					secureTextEntry={true} 
					autoCompleteType='password'
				/>
				<TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
					<Text style={styles.buttonText}>Registrarse</Text>
				</TouchableOpacity>
				<Text style={{ fontSize: 12, textAlign: 'center' }}>
					Ya está registrado? {' '}
					<Text style={{ color: 'darkred', fontWeight: 'bold' }} onPress={() => navigation.navigate('SignIn')}>
						Iniciar Sesión
					</Text>
				</Text>
			</View>
		</KeyboardAwareScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		marginHorizontal: 20
	},
	signupText: {
		fontSize: 30,
		textAlign: 'center'
	},
	signupInput: {
		borderBottomWidth: 0.5,
		height: 40,
		borderBottomColor: '#8e93a1',
		marginBottom: 30,
		minWidth: '90%'
	},
	buttonStyle: {
		backgroundColor: 'darkmagenta',
		height: 50,
		marginBottom: 20,
		justifyContent: 'center',
		marginHorizontal: 15,
		borderRadius: 15
	},
	buttonText: {
		fontSize: 20,
		textAlign: 'center',
		color: '#FFF',
		textTransform: 'uppercase',
		fontWeight: 'bold'
	},
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageStyles: {
		width: 100,
		height: 100,
		marginVertical: 20
	}
})

export default SignUp