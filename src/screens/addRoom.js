// En tu carpeta screens/AddRoom.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddRoom = ({ navigation }) => {
    const [roomName, setRoomName] = useState('');

    const handleSaveRoom = () => {
        console.log("Sala guardada:", roomName);
        navigation.goBack(); // Vuelve a la pantalla anterior tras guardar
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Ingrese el nombre de la sala"
                value={roomName}
                onChangeText={setRoomName}
                style={styles.input}
            />
            <Button
                title="Guardar Sala"
                onPress={handleSaveRoom}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20
    }
});

export default AddRoom;