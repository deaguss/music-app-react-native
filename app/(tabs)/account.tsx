import { View, Text, Dimensions, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import images from '@/constants/images'
import { CustomButton, DiscoveryCard, ModalComponent } from '@/components'
import icons from '@/constants/icons'
import { data } from './discover'
import { useAuth } from '@/context/auth-context'
import { useModal } from '@/provider/modal-provider'
import { useModalFull } from '@/provider/modal-full-provider'
import { Redirect, router } from 'expo-router'
import CreateArtist from '@/components/create-artist'



const account = () => {
    const { logout } = useAuth();
    const { showModal, isVisible, hideModal } = useModal()
    const { showModal: showModalFull, hideModal: hideModalFull } = useModalFull()

    const handleLogout = async () => {
        try {
            await logout().then(() => {
                hideModal()
                console.log('Session berhasil dihapus, logout berhasil.');
                router.replace("/sign-in");
            })
        } catch (error) {
            console.error('Gagal menghapus session:', error);
        }
    };

    const handleSetting = () => {
        router.replace("/main-setting")
        hideModal()
    }

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
                    <CreateArtist />

                    <View className="w-full px-4 my-6 flex-row justify-start items-center mb-4 mt-[6.8rem] gap-6">
                        <Image
                            source={images.profile}
                            className="w-32 h-32 rounded-full"
                        />
                        <View className="flex-1">
                            <Text className="text-white/95 font-psemibold text-3xl">Arthur</Text>
                            <View className="flex-row items-center">
                                <Text className="text-[#CDCDE0] font-pregular text-base">0</Text>
                                <Text className="text-4xl text-[#CDCDE0] mx-1">·</Text>
                                <Text className="text-[#CDCDE0] font-pregular text-base">Playlist</Text>
                            </View>
                        </View>
                    </View>
                    <View className="w-full px-4 mt-4 flex flex-row justify-start items-center gap-4">
                        <CustomButton
                            title='Edit'
                            variant='badge'
                            handlePress={() => { }}
                            containerStyles='min-h-[40px] w-[19%] flex-row justify-center items-center px-0 rounded-full'
                        />

                        <TouchableOpacity onPress={showModal}>
                            <Image
                                source={icons.menu}
                                className='w-6 h-6'
                                resizeMode='contain'
                                tintColor={'#CDCDE0'}
                            />
                        </TouchableOpacity>
                    </View>
                    <View className="w-full  mt-6">
                        <Text className="text-white/95 font-psemibold text-2xl mb-4 px-4">Your playlist</Text>

                        {data.slice(0, 3).map((item) => (
                            <DiscoveryCard
                                key={item.id.toString()}
                                item={item}
                                handlePress={() => { }}
                                variant='playlist'
                            />
                        ))}

                        <CustomButton
                            title='Load more'
                            variant='badge'
                            handlePress={() => console.log('Load more')}
                            containerStyles='min-h-[60px] w-1/3 flex-row justify-center items-center px-0 rounded-full self-center bg-black/5'
                        />
                    </View>
                    {isVisible && (
                        <ModalComponent>
                            <View className='mt-6 gap-8'>

                                <TouchableOpacity onPress={showModalFull} className='text-white flex flex-row items-center gap-5'>
                                    <Image source={icons.plus} className='w-5 h-5' tintColor={'#CDCDE0'} />
                                    <Text className='text-white/80 font-pregular text-xl'>Registrasion an Artist</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSetting} className='text-white flex flex-row items-center gap-5'>
                                    <Image source={icons.setting} className='w-5 h-5' tintColor={'#CDCDE0'} />
                                    <Text className='text-white/80 font-pregular text-xl'>Setting</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleLogout} className='text-white flex flex-row items-center gap-5'>
                                    <Image source={icons.logout} className='w-5 h-5' />
                                    <Text className='text-red-500 font-pregular text-xl'>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </ModalComponent>
                    )}
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default account