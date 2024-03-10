import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import axios from 'axios';
import * as Speech from 'expo-speech';
import LottieView from 'lottie-react-native';
// import { Images } from 'lucide-react-native';

export default function SummarizerScreen() {

    const serverLink = "https://393f-34-134-32-6.ngrok-free.app"

    const [image, setImage] = useState(null);
    const [text, setText] = useState(null);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [speaking, setSpeaking] = useState(false);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        setSummary(null);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const speak = () => {
        console.log('Speak has been pressed');
        if (speaking) {
            Speech.stop();
            setSpeaking(false);
        } else {
            //set voice type
            setSpeaking(true);
            Speech.speak(summary, {
                language: 'en',
                voice: 'en-US',
                onDone: () => {
                    console.log("Speech synthesis done");
                    setSpeaking(false);
                }
            });
        }
    }

    const summarize = async () => {
        console.log('I-ES has been pressed');
        setLoading(true);
        setText(null);
        try {
            const response = await axios.post(serverLink + '/summarize',
                {
                    text: text
                }
            ); // Replace with your API endpoint
            console.log(response.data);
            setSummary(response.data.summary);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const clickImage = async () => {
        // No permissions request is necessary for launching the image library
        setSummary(null);
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    useEffect(() => {
        (async () => {
            if (image) {
                const result = await TextRecognition.recognize(image);
                setText(result.text);
                console.log('Recognized text:', result.text);
            }
        })()
    }, [image]);

    return (
        <View className="p-4 bg-neutral-100 flex flex-1 relative]">
            <View className="mx-auto w-80">
                {
                    image ? (
                        <>
                            <Image source={{ uri: image }} height={200} width={300} className="mx-auto" />
                            {/* <Text className="text-black text-center mt-4 tracking-wider font-light test-xs">*Image Preview</Text> */}
                        </>
                    ) : (
                        <View>
                            <LottieView
                                autoPlay
                                source={require('../assets/files3.json')}
                                className="h-80 w-80"
                            />
                        </View>
                    )
                }
            </View>
            <Text className="text-2xl text-center text-black mb-1 tracking-wider font-light mt-9">
                {
                    text ? "Recognized Text" : null
                }
                {
                    summary ? "Summary" : null
                }
            </Text>
            <ScrollView className="w-full mx-auto mt-2 mb-16">
                {
                    text ?
                        (<>
                            <Text className="text-slate-50 text-sm p-2 font-light tracking-wide rounded-t-2xl rounded-b-lg bg-neutral-800">
                                {text}
                            </Text>
                        </>) : null
                }
                {
                    summary ?
                        (<>
                            <Text className="text-slate-50 text-sm p-2 font-light tracking-wide rounded-t-2xl rounded-b-lg bg-neutral-800">
                                {summary}
                            </Text>
                        </>) : null
                }
            </ScrollView>

            {/* footer */}
            <View className="w-[90%] ml-[9%] absolute bottom-5">
                <View className="flex flex-row items-center justify-around">
                    <TouchableOpacity className="bg-neutral-950 flex flex-1 h-12 py-2 rounded-l-md" onPress={clickImage}>
                        <View className="mx-auto">
                            <AntDesign name="camerao" size={30} color="white" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex flex-1 bg-neutral-50 h-12 py-2 rounded-r-md border-[1px]" onPress={pickImage}>
                        <View className="mx-auto">
                            <Ionicons name="images-outline" size={30} color="black" />
                        </View>
                    </TouchableOpacity>
                    {
                        text ? (
                            <TouchableOpacity className="bg-neutral-100 ml-3 rounded-lg p-2 border-[1px]"
                                onPress={summarize}
                            >
                                <AntDesign name="upload" size={24} color="black" />
                            </TouchableOpacity>
                        ) : (
                            null
                        )
                    }
                    {
                        summary ? (
                            <TouchableOpacity className="bg-neutral-100 border-[1px] ml-3 rounded-lg p-2"
                                onPress={speak}
                            >
                                {
                                    speaking ? (
                                        <AntDesign name="pause" size={24} color="black" />
                                    ) : (
                                        <AntDesign name="sound" size={24} color="black" />
                                    )
                                }
                            </TouchableOpacity>
                        ) : (
                            null
                        )
                    }
                </View>
            </View>
            {
                loading ? (
                    <View className="absolute top-9 bottom-0 left-0 right-0 bg-opacity-70 flex flex-1 items-center justify-center">
                        {/* take gif from assets folder */}
                        <LottieView
                            autoPlay
                            source={require('../assets/loading.json')}
                            className="h-80 w-80"
                        />
                    </View>
                ) : null
            }
        </View>
    )
}