import { View, Text, SafeAreaView, ScrollView, Dimensions, Image, TouchableOpacity, TextInput, Modal } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import icons from '@/constants/icons'
import CreatePlaylist from '@/components/create-playlist'
import { data } from './discover'
import { CustomButton, DiscoveryCard } from '@/components'

const headerData = ['Album', 'Artist', 'Playlist', 'Date']

const library = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const handleOpenModal = () => setModalVisible(true);

    return (
        <LinearGradient
            colors={['#393939', '#18181b', '#101010']}
            locations={[0, 0.25, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView className="flex-1">
                <ScrollView
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                >
                    <View className="w-full px-4 my-6 flex-row justify-between items-center mb-4 mt-[5.8rem]">
                        <Text className="text-white/95 font-psemibold text-[1.7rem] ">My Library</Text>

                        <TouchableOpacity
                            onPress={handleOpenModal}
                            activeOpacity={0.7}
                            className="flex-row items-center gap-2"
                        >
                            <Image
                                source={icons.plus}
                                className="w-6 h-6"
                                tintColor={"#CDCDE0"}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>

                        <CreatePlaylist
                            setModalVisible={setModalVisible}
                            modalVisible={modalVisible}
                        />

                    </View>
                    <View className="w-full px-4 flex-row justify-between gap-x-2 mt-2">
                        {headerData.map((data, index) => (
                            <CustomButton
                                variant='badge'
                                key={index}
                                title={data}
                                containerStyles='min-h-[40px] w-[23%] flex-row justify-center items-center px-0'
                                handlePress={() => console.log("[header library]: ", data)} />
                        ))}
                    </View>
                    <View className="w-full my-6 pb-20">
                        {data.map((item) => (
                            <DiscoveryCard
                                key={item.id.toString()}
                                item={item}
                                handlePress={() => { }}
                                variant='playlist'
                            />
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default library