import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState, useEffect, handleSubmit } from 'react';
import { AuthContext } from '../context/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';

const Account = ({ navigation }) => {
  	const [firstname, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('');
	const [image, setImage] = useState({ url: '', public_id: ''});
	const [User, setUser] = useContext(AuthContext);
	const [uploadImage, setUploadImage] = useState('');

	const user = User.data;

    useEffect(() => {
        if (User) {
            const { firstname, email, image } = User.data;
            setName(firstname);
            setEmail(email);
            setImage(image);
        }
    }, [User]);

	const handleSubmit = async () => {
		if (email === '' || password === '') {
			alert('All fields are required');
			return;
		}
		const resp = await axios.post('http://localhost:3000/auth/user', { email, password });
		if (resp.data.error) {
			alert(resp.data.error);
		} else {
			setUser(resp.data);
			await AsyncStorage.setItem('auth-rn', JSON.stringify(resp.data));
			alert('Sign In Successful');
			navigation.navigate('Home');
		}
	};

	console.log('User');
	console.log(user);

	const handleUpload = async () => {
		var options = {
			title: 'Select Image',
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		  });
		let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
		// setUploadImage(base64Image);
		let formData = new FormData();

		formData.append('myFile', {
			uri: pickerResult.assets[0].uri,
			type: 'image/jpeg/jpg',
			name: pickerResult.assets[0].fileName
		});
		
		setImage(base64Image);

		const { data } = await axios({
			method: "post",
			url: "http://localhost:3000/upload/uploadfile",
			data: formData,
			headers: { "Content-Type": "multipart/form-data" },
		})
		.then(function (data) {
			//handle success
			console.log('data');
			// setUploadImage('http://localhost:3000/uploads/'+data.data.file.filename);
		// console.log('UPLOADED RESPONSE =>', data.data.file.filename)
	})
		.catch(function (data) {
			//handle error
			console.log('data');
		});
	  	  
		//   if (!result.canceled) {
		// 	setImage(result.assets[0].uri);
		//   }
		// let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
		// if (permissionResult.granded === false) {
		// 	alert('Camera access is required');
		// 	return;
		// }
		// let pickerResult = await ImagePicker.launchImageLibraryAsync({
		// 	allowsEditing: true,
		// 	aspect: [4, 3],
		// 	base64: true
		// });
		// if (pickerResult.canceled === true) {
		// 	return;
		// }
		// // let pickerResult = await ImagePicker.launchImageLibraryAsync();
		// // if (!pickerResult.cancelled) {
		// //   const uploadResult = await FileSystem.uploadAsync('http://localhost:8000/upload/picture/1', pickerResult.uri, {
		// // 	httpMethod: 'POST',
		// // 	uploadType: FileSystemUploadType.MULTIPART,
		// // 	fieldName: 'demo_image'
		// //   });
		// // }

		// let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
		// setUploadImage(base64Image);
		// const { data } = await axios.post('http://localhost:3000/upload/uploadfile', {
		// 	image: base64Image,
		// });
		// console.log('UPLOADED RESPONSE =>', data)
	};

	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.container}>
			<View style={{ marginvertical: 100 }}>
				<View style={styles.imageContainer}>
					{image && image.url ? <Image source={{ uri: image.url }} style={styles.imageStyles} /> : 
					uploadImage ? <Image source={{ uri: uploadImage }} style={styles.imageStyles} /> : (
						<TouchableOpacity onPress={() => handleUpload()}>
							<FontAwesome5 name='camera' size={25} color='darkmagenta' />
						</TouchableOpacity>
					)}
				</View>
				{image && image.url ? (
					<TouchableOpacity onPress={() => handleUpload()}>
						<FontAwesome5 name='camera' size={25} color='darkmagenta' style={styles.iconStyle} />
					</TouchableOpacity>
				) : (
					<></>
				)}
				<Text style={styles.signupText}>{user.lastname + ', ' + user.firstname}</Text>
				<Text style={styles.emailText}>{user.email}</Text>
				<Text style={styles.roleText}>{user.address}</Text>
				<View style={{ marginHorizontal: 24 }}>
					<Text style={{ fontSize: 16, color: '#8e93a1' }}>CONTRASEÑA</Text>
					<TextInput style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoCompleteType='password' />
				</View>
				<TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
					<Text style={styles.buttonText}>Actualizar Contraseña</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAwareScrollView>
	)
}

const styles = StyleSheet.create({
	iconStyle: {
		marginTop: -5,
		marginBottom: 10,
		alignSelf: 'center'
	},
	container: {
		flex: 1,
		justifyContent: 'space-between'
	},
	signupText: {
		fontSize: 30,
		textAlign: 'center',
		paddingBottom: 10
	},
	emailText: {
		fontSize: 18,
		textAlign: 'center',
		paddingBottom: 10
	},
	roleText: {
		fontSize: 16,
		textAlign: 'center',
		paddingBottom: 10,
		color: 'gray'
	},
	signupInput: {
		borderBottomWidth: 0.5,
		height: 48,
		borderBottomColor: '#8e93a1',
		marginBottom: 30
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

export default Account