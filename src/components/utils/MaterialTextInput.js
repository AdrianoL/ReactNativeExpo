import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';

const MaterialTextInput = ({ label, ...props }) => {
	const [isFocused, setIsFocused] = useState(false);
	const focusAnim = useRef(new Animated.Value(0)).current;  // Animación para la etiqueta flotante

	useEffect(() => {
		Animated.timing(focusAnim, {
			toValue: isFocused || props.value !== '' ? 1 : 0,
			duration: 200,
			useNativeDriver: false
		}).start();
	}, [isFocused, props.value]);

	const labelStyle = {
		position: 'absolute',
		left: 0,
		top: focusAnim.interpolate({
			inputRange: [0, 1],
			outputRange: [18, 0]
		}),
		fontSize: focusAnim.interpolate({
			inputRange: [0, 1],
			outputRange: [16, 12]
		}),
		color: focusAnim.interpolate({
			inputRange: [0, 1],
			outputRange: ['#aaa', '#000']
		}),
	};

	return (
		<View style={styles.container}>
			<Animated.Text style={labelStyle}>
				{label}
			</Animated.Text>
			<TextInput
				{...props}
				style={styles.textInput}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				blurOnSubmit
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 18,
		marginVertical: 8,
	},
	textInput: {
		height: 40,
		fontSize: 16,
		color: '#000',
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	}
});

export default MaterialTextInput;