import React, { useState, useEffect, useContext } from 'react';
import { Text, Button, SafeAreaView, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as ImagePicker from 'expo-image-picker';
import FooterList from '../components/footer/FooterList';
import { AuthContext } from '../context/auth';
// import tesseract from 'react-native-tesseract-ocr';

const Links = () => {

	const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
    const [data, setData] = useState(null); // Almacena los datos escaneados
    const [User, setUser] = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [ocrResult, setOcrResult] = useState('');

    // ... solicitud de permiso para la cámara

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
	}, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            // recognizeTextFromImage(result.uri);
        }
    };

    // const recognizeTextFromImage = async (imagePath) => {
    //     const recognizedText = await tesseract.recognize(imagePath, 'LANG_ENGLISH', {
    //         whitelist: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', // Puedes personalizar esto según tus necesidades
    //     });
    //     setOcrResult(recognizedText);
    // };

	const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setData(data);
        setShowScanner(false); // Ocultar el escáner después de escanear
    };

    if (hasPermission === null) {
        return <Text>Solicitando permiso para acceder a la cámara...</Text>;
    }
    if (hasPermission === false) {
        return <Text>No se concedió el acceso a la cámara.</Text>;
    }

    // ... demás lógica del escáner de QR

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {showScanner ? (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ flex: 1 }}
                />
            ) : (
                <>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>
                        Datos escaneados: {data ? data : "No hay datos escaneados"}
                    </Text>
                    <Button title={'Escanear Código QR'} onPress={() => setShowScanner(true)} />
                    <Button title={'Capturar Imagen'} onPress={pickImage} />
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    <Text>Resultado OCR: {ocrResult}</Text>
                </>
            )}
            <FooterList />
        </SafeAreaView>
    );
};
export default Links;
