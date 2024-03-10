import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SummarizerScreen from './screen/SummarizerScreen';
import PDFChatsScreen from './screen/PDFChatScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'whitesmoke',
            borderWidth: "10px",
            flex: 1
          },
          headerTintColor: 'black',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: '300',
            fontSize: 20,
          },
        }}
      >
        {/* <Stack.Screen name="Summarizer" component={SummarizerScreen}
          // change header color
          options={{
            title: "PAGE SUMMARIZER",
          }}
        /> */}
        <Stack.Screen name="PDFChatScreen" component={PDFChatsScreen}
          // change header color
          options={{
            title: "Chat With PDF",
          }}
        />
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}
