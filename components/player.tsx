import React, { useRef, useEffect, memo } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { PlayerControls } from '@/components';

const { height } = Dimensions.get('window');
const PANEL_HEIGHT = height;

const Player = ({ onClose }: { onClose: () => void }) => {
    const translateY = useRef(new Animated.Value(height)).current;
    const sound = useRef<Audio.Sound | null>(null);

    useEffect(() => {
        const setupAudio = async () => {
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                playsInSilentModeIOS: true,
            });

            const { sound: audioSound } = await Audio.Sound.createAsync(
                { uri: 'https://example.com/audio.mp3' },
                { shouldPlay: false }
            );
            sound.current = audioSound;
        };

        setupAudio();

        return () => {
            if (sound.current) {
                sound.current.unloadAsync();
            }
        };
    }, []);

    useEffect(() => {
        Animated.spring(translateY, {
            toValue: height - PANEL_HEIGHT,
            useNativeDriver: true,
            bounciness: 0,
        }).start();
    }, []);

    const handleClose = () => {
        Animated.timing(translateY, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            if (sound.current) {
                sound.current.stopAsync();
            }
        });

        onClose();
    };

    return (
        <Animated.View
            style={[
                styles.container,
                { transform: [{ translateY }] },
            ]}
        >
            <PlayerControls onClose={handleClose} soundRef={sound} />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: PANEL_HEIGHT,
        bottom: 0,
        left: 0,
        right: 0,
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        backgroundColor: '#1D1D1D',
        padding: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
});

export default memo(Player);