import React, { useContext } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import FooterList from '../components/footer/FooterList';
import { AuthContext } from '../context/auth';

const Home = () => {
	const navigation = useNavigation(); // Utiliza useNavigation para acceder al objeto de navegación
	const [User, setUser] = useContext(AuthContext);
	const user = User.data ? User.data : null;
	const rooms = ["Sala 1", "Sala 2", "Sala 3"];

	const handleAddRoom = () => {
		navigation.navigate('AddRoom'); // Navega a la pantalla de añadir sala
	};

	const handleRoomPress = (room) => {
		navigation.navigate('ChartScreen', { roomName: room }); // Añade el parámetro roomName al navegar
	};

	return (
		<>
			<SafeAreaView style={styles.homeContainer}>
				<View style={styles.contentContainer}>
					<Text style={styles.mainText}>Inicio</Text>
					{user ? (
						<>
							<Text>Nombre: {user.firstname}</Text>
							<Text>Email: {user.email}</Text>
						</>
					) : (
						<Text>No hay información de usuario disponible.</Text>
					)}

					{rooms.map((room, index) => (
						<TouchableOpacity
							key={index}
							style={styles.button}
							onPress={() => handleRoomPress(room)} // Usa handleRoomPress para navegar
						>
							<Text style={styles.buttonText}>{room}</Text>
						</TouchableOpacity>
					))}

					<TouchableOpacity style={styles.addButton} onPress={handleAddRoom}>
						<Text style={styles.addButtonText}>Añadir Sala</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
			<SafeAreaView style={styles.footerContainer}>
				<FooterList />
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	homeContainer: {
		flex: 1,
		backgroundColor: '#000', // Fondo negro
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between', // Cambiado para distribuir el contenido
		paddingTop: 20,
	},
	button: {
		backgroundColor: '#008000', // Verde
		width: '80%', // 80% del ancho del dispositivo
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
		marginBottom: 10
	},
	buttonText: {
		color: '#fff', // Texto blanco
		fontSize: 16
	},
	mainText: {
		fontSize: 30,
		textAlign: 'center',
		marginVertical: 20
	},
	addButton: {
		backgroundColor: 'darkgreen',
		padding: 10,
		borderRadius: 5,
		alignSelf: 'center', // Asegura que el botón esté centrado
		width: '80%'
	},
	addButtonText: {
		color: '#fff',
		fontSize: 18,
		textAlign: 'center' // Asegura que el texto esté centrado
	}
});

export default Home;
