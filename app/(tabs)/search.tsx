import { View, Text, SafeAreaView, ScrollView, Image, FlatList } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import SearchInput from '@/components/search-input'
import { DiscoveryCard } from '@/components'
import { data } from './discover'

export const category = [
    {
        id: 1,
        title: "Pop Music",
        src: require("@/assets/images/album.jpg"),
        color: "bg-yellow-500"
    },
    {
        id: 2,
        title: "K - Pop",
        src: require("@/assets/images/album.jpg"),
        color: "bg-sky-500"
    },
    {
        id: 3,
        title: "Indie",
        src: require("@/assets/images/album.jpg"),
        color: "bg-emerald-500"
    },
    {
        id: 4,
        title: "Javanese",
        src: require("@/assets/images/album.jpg"),
        color: "bg-orange-500"
    },
    {
        id: 5,
        title: "Funk",
        src: require("@/assets/images/album.jpg"),
        color: "bg-purple-500"
    },
    {
        id: 6,
        title: "Rock n Roll",
        src: require("@/assets/images/album.jpg"),
        color: "bg-blue-500"
    },
    {
        id: 7,
        title: "Lo FI",
        src: require("@/assets/images/album.jpg"),
        color: "bg-red-500"
    },
    {
        id: 8,
        title: "Sleep",
        src: require("@/assets/images/album.jpg"),
        color: "bg-teal-500"
    }
]

const Search = () => {
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
                        <Text className="text-white/95 font-psemibold text-[1.7rem] mb-4 mt-16">Search</Text>

                        <SearchInput />
                    </View>
                    <View className="w-full px-4">
                        <Text className="text-white/95 font-psemibold text-2xl mb-4">#Trending</Text>
                        <View className="flex flex-wrap flex-row justify-between">
                            {category.slice(0, 4).map((data) => (
                                <DiscoveryCard item={data} key={data.id} variant='trending' handlePress={() => { }} />
                            ))}
                        </View>
                    </View>
                    <View className="w-full px-4">
                        <Text className="text-white/95 font-psemibold text-2xl mb-4">#Playlist</Text>
                        <FlatList
                            horizontal
                            data={data}
                            keyExtractor={(item) => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <DiscoveryCard item={item} handlePress={() => { }} variant='artist' />
                            )}
                            contentContainerStyle={{ paddingHorizontal: 1 }}
                        />
                    </View>
                    <View className="w-full px-4 mt-4 pb-20">
                        <Text className="text-white/95 font-psemibold text-2xl mb-4">#Explore</Text>
                        <View className="flex flex-wrap flex-row justify-between">
                            {category.toReversed().map((data) => (
                                <DiscoveryCard item={data} key={data.id} variant='trending' handlePress={() => { }} />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default Search