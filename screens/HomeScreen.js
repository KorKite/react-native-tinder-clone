import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, View, Text } from 'react-native'

const HomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>I'm Home Screen</Text>
            <Button 
                title="Go to Chat Screen" 
                onPress={()=>navigation.navigate('Chat')}
            />
        </View>
    );
};

export default HomeScreen;
