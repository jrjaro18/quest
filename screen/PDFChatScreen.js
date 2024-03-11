import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, ImageBackground, Alert, ToastAndroid } from 'react-native'
import React, { useState, useRef } from 'react'
import LottieView from 'lottie-react-native'
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ChatBubble from 'react-native-chat-bubble';
import * as Clipboard from 'expo-clipboard';

const PDFChatScreen = () => {
  const [pdf, setPdf] = useState(null)
  const [fileUploaded, setFileUploaded] = useState(false)
  const [fileUploading, setFileUploading] = useState(false)
  const [waitingForResponse, setWaitingForResponse] = useState(false)
  const scrolleRef = useRef()
  const [chat, setChat] = useState([]);
  const [queryText, setQueryText] = useState("")
  const pressedSelector = async () => {
    try {
      var ans = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        multiple: false
      })
      // console.log(ans)
      if (!ans.canceled) {
        setPdf(ans)
      } else {
        setPdf(null)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const submitPDF = async () => {
    // console.log(pdf)    
    setFileUploading(true)
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: pdf.assets[0].uri,
        type: 'application/pdf',
        name: pdf.assets[0].name,
      });

      console.log(formData)
      const response = await axios.post('http://192.168.29.36:8000/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);

    } catch (err) {
      console.log(err)
    }
    setFileUploading(false)
    setFileUploaded(true)
  }

  const submitQuery = async () => {
    setWaitingForResponse(true)
    console.log(queryText);
    // Update local state with user's query
    setChat(prevChat => [
      ...prevChat,
      { type: "user", text: queryText }
    ]);

    // Clear input field
    setQueryText("");
    scrolleRef.current.scrollToEnd({ animated: true });
    // Make request to server
    try {
      const res = await axios.post('http://192.168.29.36:8000/query-pdf/', {
        text: queryText
      });

      // Update state with model's response
      setChat(prevChat => [
        ...prevChat,
        { type: "model", text: res.data.res }
      ]);
      scrolleRef.current.scrollToEnd({ animated: true });
    } catch (err) {
      console.log(err);
    }
    setWaitingForResponse(false)
  };

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    ToastAndroid.show("Copied to Clipboard!", ToastAndroid.SHORT)
  };


  return (
    <View className="bg-neutral-50 flex flex-1 relative">
      <View className="mx-auto">
        {
          !fileUploading && fileUploaded ? (
            <>
              <LinearGradient
                className="h-[90vh] w-[100vw] absolute"
                colors={["transparent", "#ffeeff", "#fff"]}
              />

              <ScrollView
                className="mb-14 w-[98vw] mx-auto px-1"
                ref={scrolleRef}
              >
                {
                  chat.length == 0 ? (
                    <>

                      <LottieView
                        autoPlay
                        source={require('../assets/empty.json')}
                        className="h-96 mt-24"
                      />
                      <Text className="ml-[2vw] mt-3  text-neutral-950 tracking-wider font-light w-[96vw] text-center p-2 rounded-3xl absolute bottom-16">
                        Nothing to Show! Put us to some use! 😉
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text className="text-neutral-500 p-3 text-xs text-center mb-4 mt-1">
                        🔒 Privacy Notice: Hey there! Your messages are temporary and get cleared once you log out. So, feel free to chat away!
                      </Text>
                    </>
                  )
                }
                {chat && chat.map((element, index) => ( // Using map instead of forEach
                  <ChatBubble
                    isOwnMessage={element.type == "user"}
                    bubbleColor={element.type == "user" ? '#EEDEF6' : "#e2e4e5"}
                    tailColor={element.type == "user" ? '#EEDEF6' : "#e2e4e5"}
                    withTail={true}
                    onPress={() => console.log("Bubble Pressed!")}
                    key={index}
                  >
                    <Text
                      className="p-1 font-light text-sm tracking-wide"
                    >
                      {element.text}
                    </Text>
                    <TouchableOpacity
                      className={element.type == "user" ? "w-max pt-1 flex items-end pr-1" : "py-1 flex items-start"}
                      onPress={() => {
                        copyToClipboard(element.text)
                      }}
                    >
                      <MaterialCommunityIcons name="content-copy"  size={16} color={element.type == "user" ? "darkred" : "gray"} />

                    </TouchableOpacity>
                  </ChatBubble>

                ))}
              </ScrollView>
            </>
          ) : (

            fileUploading ? (
              <>
                <LottieView
                  autoPlay
                  source={require('../assets/files_upload.json')}
                  className="h-96 w-80"
                />
                <Text
                  className="font-light text-center w-full text-sm tracking-wide"
                >
                  Uploading and Training the Model just for your PDF {"\n"}
                  Hang Tight!
                </Text>
              </>
            ) : (
              <TouchableOpacity
                onPress={pressedSelector}
              >
                <LottieView
                  autoPlay
                  source={require('../assets/files3.json')}
                  className="h-80 w-80"
                />

                <Text className="text-center text-sm font-bold text-blue-950 tracking-wide">
                  {
                    !pdf ? "Select a PDF File" : pdf.assets[0].name
                  }
                </Text>
              </TouchableOpacity>
            )

          )
        }
      </View>
      {/* footer */}
      {
        pdf && fileUploaded ? (
          <>
            <TextInput
              className="w-[84vw] font-light min-h-[50px] text-base text-stone-100 bg-stone-800 border-[0.2px] absolute px-5 py-2 rounded-3xl bottom-1 ml-2"
              multiline
              selectionColor={"lightgray"}
              placeholder='...'
              placeholderTextColor={"lightgray"}
              onChangeText={setQueryText}
              value={queryText}
            />
            <TouchableOpacity
              className="absolute bottom-[6px] right-1 p-3 bg-stone-800 rounded-full"
              disabled={queryText == "" || waitingForResponse}
              onPress={submitQuery}
            >
              <AntDesign name="arrowup" size={24} color="white" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              className={pdf && !fileUploading ? "bg-slate-950 absolute bottom-2 p-4 rounded-3xl w-11/12 ml-4" : "bg-gray-200 absolute bottom-4 p-4 rounded-lg w-11/12 ml-4"}
              disabled={!pdf || fileUploading}
              onPress={submitPDF}
            >
              <Text className="text-white text-center">
                {
                  !pdf ? "Select A PDF" : "Upload"
                }
              </Text>
            </TouchableOpacity>
          </>
        )
      }
    </View >
  )
}

export default PDFChatScreen