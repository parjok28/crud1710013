import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Datamahasiswa from './src/mahasiswa/Datamahasiswa';
import Formmahasiswa from './src/mahasiswa/Formmahasiswa';

const Stack = createNativeStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Datamahasiswa">
          <Stack.Screen
            name="Datamahasiswa"
            component={Datamahasiswa}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Formmahasiswa"
            component={Formmahasiswa}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
