import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';

export default function HomeScreen() {

    const [image, setImage] = useState(null);
    const [text, setText] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
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

    const clickImage = async () => {
        // No permissions request is necessary for launching the image library
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
        <View className="p-4 bg-neutral-900 flex flex-1 relative">
            <View className="mx-auto w-80">
                {
                    image ? (
                        <>
                            <Image source={{ uri: image }} height={200} width={100} className="mx-auto" />
                            <Text className="text-white text-center mt-4 tracking-wider font-light test-xs">*Image Preview</Text>
                        </>
                    ) : (
                        <>
                            <Image source={{ uri: "https://cdn3.iconfinder.com/data/icons/folders-files/512/empty_folder-1024.png" }} className="h-72 w-80" />
                            <Text className="text-white text-center mt-4 text-xs font-light">Either click a new image or upload an existing image</Text>
                        </>
                    )
                }
            </View>
            <ScrollView className="w-full mx-auto mt-5">
                {   
                text ?
                    <Text className="text-slate-100 text-sm p-2 font-light tracking-wide mb-16 rounded-t-2xl rounded-b-lg bg-neutral-800">
                        {text}
                    </Text> : null
                }
            </ScrollView>

            {/* footer */}
            <View className="w-[90%] ml-[9%] absolute bottom-5">
                <View className="flex flex-row items-center justify-around">
                    <TouchableOpacity className="bg-blue-300 flex flex-1 h-12 py-2 rounded-l-md" onPress={clickImage}>
                        <View className="mx-auto">
                            <AntDesign name="camerao" size={30} color="white" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex flex-1 bg-red-400 h-12 py-2 rounded-r-md" onPress={pickImage}>
                        <View className="mx-auto">
                            <MaterialCommunityIcons name="view-gallery-outline" size={30} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}