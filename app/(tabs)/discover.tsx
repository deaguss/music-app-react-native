import { View, Text, SafeAreaView, Dimensions, ScrollView, FlatList, Image, Alert } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { DiscoveryCard } from '@/components';
import { router, useNavigation, useRouter } from 'expo-router';
import { usePlayerModal } from '@/provider/player-provider';

export const data = [
    {
        id: 1,
        title: "Mix jay malik",
        src: require("@/assets/images/album.jpg")
    },
    {
        id: 2,
        title: "Billie eillish",
        src: require("@/assets/images/album.jpg")
    },
    {
        id: 3,
        title: "XXX tentaction",
        src: require("@/assets/images/album.jpg")
    },
    {
        id: 4,
        title: "The weeknd",
        src: require("@/assets/images/album.jpg")
    }
]
const discover = () => {
    const { showPlayer } = usePlayerModal();

    const handleDiscover = () => {

    };

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
                    <View className="w-full px-4 my-6">
                        <Text className="text-white/95 font-psemibold text-[1.7rem] mb-4 mt-16">Discover</Text>

                        <FlatList
                            horizontal
                            data={data}
                            keyExtractor={(item) => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <DiscoveryCard item={item} handlePress={handleDiscover} />
                            )}
                            contentContainerStyle={{ paddingHorizontal: 1 }}
                        />
                    </View>
                    <View className="w-full px-4">
                        <Text className="text-white/95 font-psemibold text-[1.7rem] mb-4">Popular Artist</Text>
                        <FlatList
                            horizontal
                            data={data}
                            keyExtractor={(item) => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <DiscoveryCard item={item} handlePress={handleDiscover} variant='artist' />
                            )}
                            contentContainerStyle={{ paddingHorizontal: 1 }}
                        />
                    </View>
                    <View className="w-full my-6 pb-20">
                        <Text className="text-white/95 font-psemibold text-[1.7rem] mb-4">Recently Play</Text>
                        {data.map((item) => (
                            <DiscoveryCard
                                key={item.id.toString()}
                                item={item}
                                handlePress={showPlayer}
                                variant='play'
                            />
                        ))}
                    </View>

                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default discover