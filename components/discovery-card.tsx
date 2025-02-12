import icons from '@/constants/icons';
import React from 'react';
import { View, Text, Image, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface DiscoveryCardProps<T> extends TouchableOpacityProps {
    item: T;
    variant?: 'default' | 'artist' | 'play' | 'trending';
    handlePress: () => void;
}

const DiscoveryCard: React.FC<DiscoveryCardProps<any>> = ({
    item,
    variant = 'default',
    handlePress,
    ...props
}) => {
    const [isPlaying, setIsPlaying] = React.useState(false);

    const handlePlaying = () => {
        setIsPlaying(true);
        setTimeout(() => {
            setIsPlaying(false);
        }, 10000);
    };

    let cardContent;

    switch (variant) {
        case 'artist':
            cardContent = (
                <View
                    className="relative mr-4"
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 5,
                    }}
                >
                    <View className="items-center">
                        <Image
                            source={item.src}
                            className="w-28 h-28 rounded-full"
                            resizeMode="contain"
                        />
                        <Text className="text-white text-center font-pmedium text-lg mt-2">
                            {item.title}
                        </Text>
                    </View>
                </View>
            );
            break;

        case 'play':
            cardContent = (
                <View
                    className={`relative py-4 flex flex-row items-center justify-between gap-4 ${isPlaying ? 'bg-white/20' : ''
                        }`}
                >
                    <View className="flex flex-row mx-4 items-center gap-4">
                        <Image
                            source={item.src}
                            className="w-20 h-20 rounded-md"
                            resizeMode="contain"
                        />
                        <View className="items-start">
                            <Text className="text-white/90 text-center font-pmedium text-xl mt-2">
                                {item.title}
                            </Text>
                            <Text className="text-white/70 text-center font-pregular text-base mt-2">
                                {item.title}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={handlePlaying} className="pr-4">
                        <Image
                            source={isPlaying ? icons.paused : icons.play}
                            className="w-7 h-7"
                            style={{ tintColor: '#eab308' }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            );
            break;

        case 'trending':
            cardContent = (
                <View
                    style={{ width: 180, height: 100 }}
                    className={`${item.color} flex items-center justify-center mb-4 rounded-lg relative`}
                >
                    <Text className="text-white text-lg font-psemibold absolute top-0 left-0 ml-4 mt-2">
                        {item.title}
                    </Text>
                    <View
                        style={{
                            width: 100,
                            height: 100,
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            overflow: 'hidden',
                        }}
                    >
                        <View
                            style={{
                                position: 'absolute',
                                bottom: -20,
                                right: -15,
                                width: 100,
                                height: 100,
                                backgroundColor: 'rgba(7, 5, 33, 0.15)',
                                borderRadius: 100,
                                transform: [{ rotate: '45deg' }],
                            }}
                        />
                        <Image
                            source={item.src}
                            style={{
                                position: 'absolute',
                                bottom: 5,
                                right: 0,
                                width: 50,
                                height: 50,
                                zIndex: 1,
                            }}
                        />
                    </View>
                </View>
            );
            break;

        default:
            cardContent = (
                <View
                    className="relative mr-4"
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 5,
                    }}
                >
                    <Image
                        source={item.src}
                        className="w-40 h-40 rounded-md"
                        resizeMode="contain"
                    />
                    <View className="absolute inset-0 flex items-start justify-end m-2 mb-8">
                        <Text className="text-black/80 font-pmedium text-sm px-1.5 py-0.5 rounded-md bg-white/80">
                            <Text className="text-yellow-500 font-psemibold">|</Text> {item.title}
                        </Text>
                    </View>
                    <Text className="text-white/70 font-pmedium text-sm mt-2">
                        {item.title}
                    </Text>
                </View>
            );
            break;
    }

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7} {...props}>
            {cardContent}
        </TouchableOpacity>
    );
};

export default DiscoveryCard;
