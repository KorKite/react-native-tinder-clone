import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react'
import { Button, View, Text, TouchableOpacity,Image,StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../hooks/useAuth';
import tw from "tailwind-rn"
import {AntDesign, Entypo, Ionicons}  from "@expo/vector-icons"
import Swiper from "react-native-deck-swiper"

const DUMMY_DATA = [
    {
        firstName:"Sonny",
        lastName:"Sangha",
        occupation:"Software Developer",
        photoURL:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        age:29,
        id:456
    },
    {
        firstName:"Dana",
        lastName:"Choi",
        occupation:"Software Developer",
        photoURL:"https://images.unsplash.com/photo-1586083092890-8b8f7a2e9861?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80",
        age:29,
        id:789
    },
    {
        firstName:"Enlo",
        lastName:"Park",
        occupation:"Software Developer",
        photoURL:"https://images.unsplash.com/photo-1577307890875-3958f8761779?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8&w=1000&q=80",
        age:29,
        id:806
    }
]


const HomeScreen = () => {
    const navigation = useNavigation();
    const {user,logout} = useAuth();


    return (
        <SafeAreaView style={tw("flex-1")}>
            {/* header */}
            <View style={tw("flex-row items-center relative justify-between px-5")}>
                <TouchableOpacity>
                    <Image style={tw("h-10 w-10 rounded-full")} source={{uri:user.photoURL}}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={tw("h-14 w-14")} source={require("../images/logo.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate("Chat")}>
                    <Ionicons name="chatbubbles-sharp" color={"#333dcf"} size={30}/>
                </TouchableOpacity>
            </View>
            {/* end of the header */}
            {/* cards */}
            <View style={tw("flex-1 -mt-6")}>
            <Swiper 
                containerStyle={{backgroundColor:"transparent"}}
                cards = {DUMMY_DATA} 
                verticalSwipe={false}
                cardIndex={0}
                animateCardOpacity
                stackSize={5}
                renderCard = {(card)=>(
                    <View key={card.id} style={tw("relative bg-white h-3/4 rounded-xl")}>
                        <Image style={tw("top-0 h-full w-full rounded-t-xl")} 
                        source={{uri:card.photoURL}}/>
                        <View style={
                            [
                                tw("buttom-0 bg-white w-full flex-row justify-between items-between h-20 px-6 py-2 rounded-b-xl"),
                                styles.cardShadow
                            ]
                        }>
                            <View style={tw()}>
                                <Text style={tw("text-xl font-bold")}>{card.firstName} {card.lastName}</Text>
                                <Text style={tw()}>{card.occupation}</Text>
                            </View>
                            <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
                        </View>
                    </View>
                )}
            />
            </View>
            {/* <Text>I'm Home Screen</Text>

            <Button title ="Logout" onPress={logout}/> */}
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    cardShadow:{
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:1,
        },
        shadowOpacity:0.2,
        shadowRadius: 1.41,
        elevation:2,
    },
})