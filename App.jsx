import React from 'react';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-vector-icons/Icon';
import TempoReal from './temporeal';;

const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Tempo Real") {
                iconName = "clock-o";
              } else if (route.name === "Registro de Marcadores") {
                iconName = "Pencil";
              }

              return <Icon name={iconName} size={size} color={color} />
            }
          })}
          >

          <Tabs.Screen name="Tempo Real" component={TempoReal} />
          <Tabs.Screen name="Registro de Marcadores" components={RegistroDeMarcadores} />
      </Tabs.Navigator>
    </NavigationContainer>
   
  );
}
