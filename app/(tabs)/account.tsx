import { View, Text, Dimensions, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

const account = () => {
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center h-full px-4 my-6"
                    style={{
                        minHeight: Dimensions.get("window").height - 100,
                    }}>
                    <Text className='text-blue-400'>ACcount</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default account