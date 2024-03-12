import { View, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect } from 'react'
import LottieView from 'lottie-react-native'


const HomeScreen = ({ navigation }) => {

    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: 6,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [translateY]);


    return (
        <View
            className="bg-neutral-50 flex-1 px-2"
        >
            <View>
                <LottieView
                    source={require("../assets/home.json")}
                    autoPlay
                    loop
                    className="h-96 mt-6"
                />
                <Animated.Text
                    style={[
                        { transform: [{ translateY: translateY }] }
                    ]}
                    className="mx-auto text-center text-neutral-300 text-xs font-light w-11/12 p-2"
                > 
                   
                   <Text className="text-3xl text-black">
                   Q.U.E.S.T
                   </Text>
                   {"\n"}
                   Query Understanding & Evaluation System for Text
                </Animated.Text>
            </View>
            <View className="absolute bottom-4 w-full left-2"
            >
                <TouchableOpacity
                    className="mx-auto p-4 bg-stone-800 w-[95%] rounded-t-xl"
                    onPress={() => {
                        navigation.navigate("SummarizerScreen")
                    }}
                >
                    <Text
                        className="text-center text-neutral-50 text-base tracking-wider"
                    >
                        Summarize Page
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="mx-auto p-4 w-[95%] rounded-b-xl border-2 border-stone-800"
                    onPress={() => {
                        navigation.navigate("PDFChatScreen")
                    }}
                >
                    <Text
                        className="text-center text-neutral-950 font-semibold text-base tracking-wide"
                    >
                        Chat With PDF
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}



export default HomeScreen