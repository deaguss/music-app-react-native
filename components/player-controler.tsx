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
            <View className="flex-row justify-between items-center mb-8 p-4">
                <TouchableOpacity onPress={onClose}>
                    <Image
                        source={icons.arrowDown}
                        className="w-5 h-5 opacity-60"
                        tintColor={"#CDCDE0"}
                    />
                </TouchableOpacity>
                <Text className="font-pbold text-lg text-white/90">Now Playing</Text>
                <View className="w-6" />
            </View>
            <View className="items-center mb-8 mt-4 p-4">
                <Image
                    source={{ uri: 'data:image/jpeg;base64,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' }}
                    className="w-full h-96 rounded-xl"
                />
            </View>
            <View className="mb-4">
                <Text className="text-xl font-pbold text-center text-white/90">Song Title</Text>
                <Text className="text-white/50 font-pregular text-center">Artist Name</Text>
            </View>
            <Slider
                value={position}
                minimumValue={0}
                maximumValue={duration}
                onSlidingComplete={handlePositionChange}
                minimumTrackTintColor="#eab308"
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor="#eab308"
            />
            <View className='flex flex-row items-center justify-between px-4 mt-1'>
                <Text className='font-pregular text-white/60'>0:00</Text>
                <Text className='font-pregular text-white/60'>3:00</Text>
            </View>

            <View className="items-center mt-10 justify-start bg-[#2A2A2A] h-full pt-4 rounded-t-xl">
                <View className='justify-center flex flex-row items-center p-4'>
                    <TouchableOpacity className="p-4">
                        <Image
                            source={icons.heart}
                            className="w-6 h-6"
                            tintColor={"#CDCDE0"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-4 mx-6">
                        <Image
                            source={icons.back}
                            className="w-8 h-8"
                            tintColor={"#CDCDE0"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="bg-[#eab308] p-6 rounded-full flex justify-center items-center flex-row"
                        onPress={togglePlayback}
                    >
                        <Image
                            source={isPlaying ? icons.paused : icons.play}
                            className="w-6 h-6 object-center"
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-4 mx-6">
                        <Image
                            source={icons.back}
                            className="w-8 h-8 rotate-180"
                            tintColor={"#CDCDE0"} />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-4">
                        <Image
                            source={icons.shuffle}
                            className="w-7 h-7"
                            tintColor={"#CDCDE0"} />
                    </TouchableOpacity>
                </View>
                <View className='w-full justify-between flex flex-row items-center px-10'>
                    <TouchableOpacity className="">
                        <Image
                            source={icons.share}
                            className="w-6 h-6 ml-1.5"
                            tintColor={"#CDCDE0"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity className="">
                        <Image
                            source={icons.download}
                            className="w-8 h-8"
                            tintColor={"#CDCDE0"}
                        />
                    </TouchableOpacity>
                </View>

            </View >
        </View >
    );
});

export default PlayerControls;