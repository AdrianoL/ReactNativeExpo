import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';
import AddRoom from '../screens/addRoom'; // Asegúrate de que la primera letra sea mayúscula
import ChartScreen from '../screens/chartScreen'; // Asegúrate de que la primera letra sea mayúscula
import SignUp from '../screens/signup';
import SignIn from '../screens/signin';
import Account from '../screens/account';
import Post from '../screens/post';
import Links from '../screens/links';
import { AuthContext } from '../context/auth';
import HeaderTabs from './header/HeaderTabs';

const Stack = createNativeStackNavigator();

const NavigationScreen = () => {
    const [state, setState] = useContext(AuthContext);
    const authenticated = state && state.token !== '' && state.user !== null;

    return (
        <Stack.Navigator initialRouteName='Home'>
            {authenticated ? (
                <>
                    <Stack.Screen name='Home' component={Home} options={{ headerRight: () => <HeaderTabs /> }} />
                    <Stack.Screen name='Account' component={Account} />
                    <Stack.Screen name='Post' component={Post} />
                    <Stack.Screen name='Links' component={Links} />
                    <Stack.Screen name='AddRoom' component={AddRoom} options={{ title: 'Añadir Sala' }} />
                    <Stack.Screen name="ChartScreen" component={ChartScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name='SignUp' component={SignUp} />
                    <Stack.Screen name='SignIn' component={SignIn} />
                </>
            )}
        </Stack.Navigator>
    );
}

export default NavigationScreen;
