import React, {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useCallback,
    useMemo,
    useRef,
} from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { getQueue, getTrack } from '@/api/music';
import { TrackResponse } from '@/types';

export enum MusicPlayerActionTypes {
    LOAD_TRACK = 'LOAD_TRACK',
    PLAY = 'PLAY',
    PAUSE = 'PAUSE',
    TOGGLE_PLAYBACK = 'TOGGLE_PLAYBACK',
    UPDATE_POSITION = 'UPDATE_POSITION',
    UPDATE_DURATION = 'UPDATE_DURATION',
    SET_QUEUE = 'SET_QUEUE',
    SET_ERROR = 'SET_ERROR',
}

export type PlayerState = {
    currentTrack: TrackResponse | null;
    isPlaying: boolean;
    position: number;
    duration: number;
    queue: TrackResponse[];
    isLoaded: boolean;
    error: string | null;
};

export type Action =
    | { type: MusicPlayerActionTypes.LOAD_TRACK; payload: TrackResponse }
    | { type: MusicPlayerActionTypes.PLAY }
    | { type: MusicPlayerActionTypes.PAUSE }
    | { type: MusicPlayerActionTypes.TOGGLE_PLAYBACK }
    | { type: MusicPlayerActionTypes.UPDATE_POSITION; payload: number }
    | { type: MusicPlayerActionTypes.UPDATE_DURATION; payload: number }
    | { type: MusicPlayerActionTypes.SET_QUEUE; payload: TrackResponse[] }
    | { type: MusicPlayerActionTypes.SET_ERROR; payload: string | null };

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
        case MusicPlayerActionTypes.LOAD_TRACK:
            return { ...state, currentTrack: action.payload, isLoaded: true };
        case MusicPlayerActionTypes.PLAY:
            return { ...state, isPlaying: true };
        case MusicPlayerActionTypes.PAUSE:
            return { ...state, isPlaying: false };
        case MusicPlayerActionTypes.TOGGLE_PLAYBACK:
            return { ...state, isPlaying: !state.isPlaying };
        case MusicPlayerActionTypes.UPDATE_POSITION:
            return { ...state, position: action.payload };
        case MusicPlayerActionTypes.UPDATE_DURATION:
            return { ...state, duration: action.payload };
        case MusicPlayerActionTypes.SET_QUEUE:
            return { ...state, queue: action.payload };
        case MusicPlayerActionTypes.SET_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export type MusicPlayerContextType = PlayerState & {
    loadTrack: (trackId: string) => Promise<void>;
    togglePlayback: () => Promise<void>;
    seekTo: (position: number) => Promise<void>;
    loadQueue: () => Promise<void>;
    clearError: () => void;
};

const MusicPlayerContext = createContext<MusicPlayerContextType>(
    {} as MusicPlayerContextType
);

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(playerReducer, initialState);
    const soundRef = useRef<Audio.Sound | null>(null);

    const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
        if (status.isLoaded) {
            dispatch({
                type: MusicPlayerActionTypes.UPDATE_POSITION,
                payload: status.positionMillis,
            });
            if (status.durationMillis) {
                dispatch({
                    type: MusicPlayerActionTypes.UPDATE_DURATION,
                    payload: status.durationMillis,
                });
            }
        }
    }, []);

    const loadTrack = useCallback(async (trackId: string) => {
        try {
            const response = await getTrack(trackId);
            const track = response.data;

            // Unload previous track jika ada
            if (soundRef.current) {
                await soundRef.current.unloadAsync();
            }

            // Atur mode audio agar tetap aktif di background
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
            dispatch({ type: MusicPlayerActionTypes.LOAD_TRACK, payload: track });
        } catch (error) {
            dispatch({
                type: MusicPlayerActionTypes.SET_ERROR,
                payload: 'Failed to load track',
            });
        }
    }, [onPlaybackStatusUpdate]);

    const togglePlayback = useCallback(async () => {
        if (!soundRef.current) return;
        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded) {
            if (status.isPlaying) {
                await soundRef.current.pauseAsync();
                dispatch({ type: MusicPlayerActionTypes.PAUSE });
            } else {
                await soundRef.current.playAsync();
                dispatch({ type: MusicPlayerActionTypes.PLAY });
            }
        }
    }, []);

    const seekTo = useCallback(async (position: number) => {
        if (soundRef.current) {
            await soundRef.current.setPositionAsync(position);
        }
    }, []);

    const loadQueue = useCallback(async () => {
        try {
            const response = await getQueue();
            dispatch({
                type: MusicPlayerActionTypes.SET_QUEUE,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: MusicPlayerActionTypes.SET_ERROR,
                payload: 'Failed to load queue',
            });
        }
    }, []);

    const clearError = useCallback(() => {
        dispatch({ type: MusicPlayerActionTypes.SET_ERROR, payload: null });
    }, []);

    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    const value = useMemo(
        () => ({
            ...state,
            loadTrack,
            togglePlayback,
            seekTo,
            loadQueue,
            clearError,
        }),
        [state, loadTrack, togglePlayback, seekTo, loadQueue, clearError]
    );

    return (
        <MusicPlayerContext.Provider value={value}>
            {children}
        </MusicPlayerContext.Provider>
    );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);
