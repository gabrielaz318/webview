import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, StatusBar, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {
	ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
	
	const [url, setUrl] = useState('');
	const [go, setGo] = useState(false);
	const [algumItem, setAlgumItem] = useState(false);

	useEffect(() => {
		verificar()
	})

	const adicionar = async () => {
		try {
			await AsyncStorage.setItem('link', url)
		} catch (e) {
			Alert.Alert('Erro', 'Erro ao gravar item')
		}

		setGo(true)
	}
	const verificar = async () => {
		try {
			const value = await AsyncStorage.getItem('link')
			if (value !== null) {
				setUrl(value)
				setGo(true)
			}
		} catch (e) {
			Alert.alert('Erro', 'Erro ao recuperar')
			setAlgumItem(true)
		}
	}

	
	if (go == false || url === '') {
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.text}
					onChangeText={text => setUrl(text)}
					value={url}
				/>
				<View style={{ margin: 5 }}>
					<Button
						onPress={() => adicionar()}
						title="Pronto"
					/>
				</View>
			</View>
		);

	} else {
		return (
			<>
				<StatusBar
					hidden={true}
				/>
				<WebView
					source={{ uri: url }}
				/>
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	text: {
		borderWidth: 1,
		margin: 5,
	},
});