import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from '../context/auth';

import MaterialTextInput from '../components/utils/MaterialTextInput';  // Asegúrate de importar correctamente

const SignIn = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [state, setState] = useContext(AuthContext);

	const handleSubmit = async () => {
		console.log("handleSubmit called"); // Asegúrate de que handleSubmit se está llamando
		try {
			if (email === '' || password === '') {
				alert("All fields are required");
				return;
			}
			console.log('entra?');
			const resp = await axios.post('http://localhost:3000/auth/user', { email, password });
			console.log('resp');
			console.log(resp);
			if (resp.data.error) {
				alert(resp.data.error);
			} else {
				console.log('else');
				setState(resp);
				await AsyncStorage.setItem('auth-rn', JSON.stringify(resp.data));
				alert("Sign In Successful");
				navigation.navigate('Home');
			}
		} catch (error) {
			console.error(error); // Registra cualquier error que ocurra
			alert("An error occurred while signing in.");
		}
	};

	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.container}>
			<View style={{ marginVertical: 100 }}>
				<View style={styles.imageContainer}>
					<Image source={require('../assets/leon-libertario.png')} style={styles.imageStyles} />
				</View>
				<MaterialTextInput
					label="EMAIL"
					value={email}
					onChangeText={setEmail}
					autoCompleteType="email"
					keyboardType="email-address"
				/>
				<MaterialTextInput
					label="CONTRASEÑA"
					value={password}
					onChangeText={setPassword}
					secureTextEntry={true}
					autoCompleteType="password"
				/>
				<TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
					<Text style={styles.buttonText}>Ingresar</Text>
				</TouchableOpacity>
				<Text style={{ fontSize: 12, textAlign: 'center' }}>
					No está registrado? {' '}
					<Text style={{ color: 'darkred', fontWeight: 'bold' }} onPress={() => navigation.navigate('SignUp')}>
						Registrarse
					</Text>
				</Text>
				<Text style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }}>Olvido su contraseña?</Text>
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
		height: 48,
		borderBottomColor: "#8e93a1",
		marginBottom: 30,
	},
	buttonStyle: {
		backgroundColor: "darkmagenta",
		height: 50,
		marginBottom: 20,
		justifyContent: "center",
		marginHorizontal: 15,
		borderRadius: 15,
	},
	buttonText: {
		fontSize: 20,
		textAlign: 'center',
		color: '#fff',
		textTransform: 'uppercase',
		fontWeight: 'bold'
	},
	imageContainer: { justifyContent: "center", alignItems: "center" },
	imageStyles: { width: 100, height: 100, marginVertical: 20 }
})

export default SignIn