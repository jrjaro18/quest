import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SummarizerScreen from './screen/SummarizerScreen';
import PDFChatsScreen from './screen/PDFChatScreen';
import HomeScreen from './screen/HomeScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'rgb(250,250,250)',
          },
          headerTintColor: 'black',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: '300',
            fontSize: 30,
          },
          headerBackVisible: false
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen}
          // change header color
          options={{
            title: "QUEST",
          }}
          
        />
        <Stack.Screen name="SummarizerScreen" component={SummarizerScreen}
          // change header color
          options={{
            title: "Summarizer",
            animation: "slide_from_right"
          }}
        />
        <Stack.Screen name="PDFChatScreen" component={PDFChatsScreen}
          // change header color
          options={{
            title: "Queárea",
            animation: "slide_from_right"
          }}
        />

      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}
