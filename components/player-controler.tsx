import React, { memo, useCallback, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import icons from '@/constants/icons';
import { AVPlaybackStatus, Audio } from 'expo-av';

type Props = {
    onClose: () => void;
    soundRef: React.MutableRefObject<Audio.Sound | null>;
};

const PlayerControls = memo(({ onClose, soundRef }: Props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlayback = useCallback(async () => {
        if (!soundRef.current) return;

        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded) {
            if (status.isPlaying) {
                await soundRef.current.pauseAsync();
            } else {
                await soundRef.current.playAsync();
            }
            setIsPlaying(!status.isPlaying);
        }
    }, []);

    const handlePositionChange = useCallback(async (value: number) => {
        if (soundRef.current) {
            await soundRef.current.setPositionAsync(value * duration);
        }
    }, [duration]);

    return (
        <View>
            <View className="flex-row justify-between items-center mb-8">
                <TouchableOpacity onPress={onClose}>
                    <Image source={icons.leftArrow} className="w-6 h-6" />
                </TouchableOpacity>
                <Text className="font-bold text-lg">Now Playing</Text>
                <View className="w-6" />
            </View>
            <View className="items-center mb-8">
                <Image
                    source={{ uri: 'https://example.com/album-art.jpg' }}
                    className="w-64 h-64 rounded-xl"
                />
            </View>
            <View className="mb-4">
                <Text className="text-xl font-bold text-center">Song Title</Text>
                <Text className="text-gray-500 text-center">Artist Name</Text>
            </View>
            <Slider
                value={position}
                minimumValue={0}
                maximumValue={duration}
                onSlidingComplete={handlePositionChange}
                minimumTrackTintColor="#3B82F6"
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor="#3B82F6"
            />

            <View className="flex-row justify-center items-center mt-8">
                <TouchableOpacity className="p-4">
                    <Image source={icons.leftArrow} className="w-6 h-6" />
                </TouchableOpacity>

                <TouchableOpacity className="p-4 mx-6">
                    <Image source={icons.leftArrow} className="w-8 h-8" />
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-blue-500 p-4 rounded-full"
                    onPress={togglePlayback}
                >
                    <Image
                        source={isPlaying ? icons.paused : icons.play}
                        className="w-12 h-12"
                    />
                </TouchableOpacity>

                <TouchableOpacity className="p-4 mx-6">
                    <Image source={icons.leftArrow} className="w-8 h-8" />
                </TouchableOpacity>

                <TouchableOpacity className="p-4">
                    <Image source={icons.leftArrow} className="w-6 h-6" />
                </TouchableOpacity>
            </View>
        </View>
    );
});

export default PlayerControls;