import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { getQueue, getTrack } from '@/api/music';
import { TrackResponse } from '@/types';


type PlayerState = {
    currentTrack: TrackResponse | null;
    isPlaying: boolean;
    position: number;
    duration: number;
    queue: TrackResponse[];
    isLoaded: boolean;
    error: string | null;
};

type Action =
    | { type: 'LOAD_TRACK'; payload: TrackResponse }
    | { type: 'PLAY' }
    | { type: 'PAUSE' }
    | { type: 'TOGGLE_PLAYBACK' }
    | { type: 'UPDATE_POSITION'; payload: number }
    | { type: 'UPDATE_DURATION'; payload: number }
    | { type: 'SET_QUEUE'; payload: TrackResponse[] }
    | { type: 'SET_ERROR'; payload: string | null };

type MusicPlayerContextType = PlayerState & {
    loadTrack: (trackId: string) => Promise<void>;
    togglePlayback: () => void;
    seekTo: (position: number) => void;
    loadQueue: () => Promise<void>;
    clearError: () => void;
};

const initialState: PlayerState = {
    currentTrack: null,
    isPlaying: false,
    position: 0,
    duration: 0,
    queue: [],
    isLoaded: false,
    error: null,
};

const playerReducer = (state: PlayerState, action: Action): PlayerState => {
    switch (action.type) {
        case 'LOAD_TRACK':
            return { ...state, currentTrack: action.payload, isLoaded: true };
        case 'PLAY':
            return { ...state, isPlaying: true };
        case 'PAUSE':
            return { ...state, isPlaying: false };
        case 'TOGGLE_PLAYBACK':
            return { ...state, isPlaying: !state.isPlaying };
        case 'UPDATE_POSITION':
            return { ...state, position: action.payload };
        case 'UPDATE_DURATION':
            return { ...state, duration: action.payload };
        case 'SET_QUEUE':
            return { ...state, queue: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

const MusicPlayerContext = createContext<MusicPlayerContextType>({} as MusicPlayerContextType);

export const MusicPlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(playerReducer, initialState);
    const soundRef = React.useRef<Audio.Sound | null>(null);

    const loadTrack = async (trackId: string) => {
        try {
            const response = await getTrack(trackId);
            const track = response.data;

            // Unload previous track
            if (soundRef.current) {
                await soundRef.current.unloadAsync();
            }

            // Load new track
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                playsInSilentModeIOS: true,
            });

            const { sound } = await Audio.Sound.createAsync(
                { uri: track.file_path },
                { shouldPlay: false },
                onPlaybackStatusUpdate
            );

            soundRef.current = sound;
            dispatch({ type: 'LOAD_TRACK', payload: track });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to load track' });
        }
    };

    const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if (status.isLoaded) {
            dispatch({ type: 'UPDATE_POSITION', payload: status.positionMillis });
            if (status.durationMillis) {
                dispatch({ type: 'UPDATE_DURATION', payload: status.durationMillis });
            }
        }
    };

    const togglePlayback = async () => {
        if (!soundRef.current) return;

        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded) {
            if (status.isPlaying) {
                await soundRef.current.pauseAsync();
                dispatch({ type: 'PAUSE' });
            } else {
                await soundRef.current.playAsync();
                dispatch({ type: 'PLAY' });
            }
        }
    };

    const seekTo = async (position: number) => {
        if (soundRef.current) {
            await soundRef.current.setPositionAsync(position);
        }
    };

    const loadQueue = async () => {
        try {
            const response = await getQueue();
            dispatch({ type: 'SET_QUEUE', payload: response?.data });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to load queue' });
        }
    };

    const clearError = () => {
        dispatch({ type: 'SET_ERROR', payload: null });
    };

    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    return (
        <MusicPlayerContext.Provider
            value={{
                ...state,
                loadTrack,
                togglePlayback,
                seekTo,
                loadQueue,
                clearError,
            }}
        >
            {children}
        </MusicPlayerContext.Provider>
    );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);