import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { Artist as ArtistResponse } from '@/types';
import { getArtistById, getArtist, updateArtist, createArtist } from '@/api/artist';

export type ArtistState = {
    artists: ArtistResponse[];
    selectedArtist: ArtistResponse | null;
    loading: {
        fetch: boolean;
        create: boolean;
        update: boolean;
    };
    error: {
        fetch: string | null;
        create: string | null;
        update: string | null;
    };
};

export enum ArtistActionTypes {
    FETCH_ARTISTS = 'FETCH_ARTISTS',
    FETCH_ARTIST = 'FETCH_ARTIST',
    CREATE_ARTIST = 'CREATE_ARTIST',
    UPDATE_ARTIST = 'UPDATE_ARTIST',
    CLEAR_ERROR = 'CLEAR_ERROR'
}

export const initialState: ArtistState = {
    artists: [],
    selectedArtist: null,
    loading: {
        fetch: false,
        create: false,
        update: false
    },
    error: {
        fetch: null,
        create: null,
        update: null
    }
};

export const artistReducer = (state: ArtistState, action: any): ArtistState => {
    switch (action.type) {
        case ArtistActionTypes.FETCH_ARTISTS:
            return {
                ...state,
                artists: action.payload.data,
                loading: { ...state.loading, fetch: false },
                error: { ...state.error, fetch: action.payload.error }
            };

        case ArtistActionTypes.FETCH_ARTIST:
            return {
                ...state,
                selectedArtist: action.payload.data,
                loading: { ...state.loading, fetch: false },
                error: { ...state.error, fetch: action.payload.error }
            };

        case ArtistActionTypes.CREATE_ARTIST:
            return {
                ...state,
                artists: action.payload.error
                    ? state.artists
                    : [...state.artists, action.payload.data],
                loading: { ...state.loading, create: false },
                error: { ...state.error, create: action.payload.error }
            };

        case ArtistActionTypes.UPDATE_ARTIST:
            return {
                ...state,
                artists: action.payload.error
                    ? state.artists
                    : state.artists.map(artist =>
                        artist.id === action.payload.data.id
                            ? action.payload.data
                            : artist
                    ),
                loading: { ...state.loading, update: false },
                error: { ...state.error, update: action.payload.error }
            };

        case ArtistActionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: {
                    ...state.error,
                    [action.payload.type]: null
                }
            };

        default:
            return state;
    }
};


interface ArtistContextType extends ArtistState {
    fetchArtists: () => Promise<void>;
    fetchArtistById: (id: string) => Promise<void>;
    createArtist: (data: FormData) => Promise<void>;
    updateArtist: (id: string, data: FormData) => Promise<void>;
    clearError: (type: 'fetch' | 'create' | 'update') => void;
}

const ArtistContext = createContext<ArtistContextType>({} as ArtistContextType);

export const ArtistProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(artistReducer, initialState);

    const fetchArtists = async () => {
        try {
            const response = await getArtist();
            dispatch({
                type: ArtistActionTypes.FETCH_ARTISTS,
                payload: { data: response.data }
            });
        } catch (error: any) {
            dispatch({
                type: ArtistActionTypes.FETCH_ARTISTS,
                payload: {
                    data: [],
                    error: error.response?.data?.message || 'Gagal mengambil data artist'
                }
            });
            throw error;
        }
    };

    const fetchArtistById = async (id: string) => {
        try {
            const response = await getArtistById(id);
            dispatch({
                type: ArtistActionTypes.FETCH_ARTIST,
                payload: { data: response.data }
            });
        } catch (error: any) {
            dispatch({
                type: ArtistActionTypes.FETCH_ARTIST,
                payload: {
                    data: null,
                    error: error.response?.data?.message || 'Gagal mengambil detail artist'
                }
            });
            throw error;
        }
    };

    const handleCreateArtist = async (data: FormData) => {
        try {
            const response = await createArtist(data);
            dispatch({
                type: ArtistActionTypes.CREATE_ARTIST,
                payload: { data: response.data }
            });
        } catch (error: any) {
            dispatch({
                type: ArtistActionTypes.CREATE_ARTIST,
                payload: {
                    data: null,
                    error: error.response?.data?.message || 'Gagal membuat artist'
                }
            });
            throw error;
        }
    };

    const handleUpdateArtist = async (id: string, data: FormData) => {
        try {
            const response = await updateArtist(id, data);
            dispatch({
                type: ArtistActionTypes.UPDATE_ARTIST,
                payload: { data: response.data }
            });
        } catch (error: any) {
            dispatch({
                type: ArtistActionTypes.UPDATE_ARTIST,
                payload: {
                    data: null,
                    error: error.response?.data?.message || 'Gagal mengupdate artist'
                }
            });
            throw error;
        }
    };

    const clearError = (type: 'fetch' | 'create' | 'update') => {
        dispatch({
            type: ArtistActionTypes.CLEAR_ERROR,
            payload: { type }
        });
    };

    const value = useMemo(() => ({
        ...state,
        fetchArtists,
        fetchArtistById,
        createArtist: handleCreateArtist,
        updateArtist: handleUpdateArtist,
        clearError
    }), [
        state,
        fetchArtists,
        fetchArtistById,
        handleCreateArtist,
        handleUpdateArtist,
        clearError
    ]);

    return (
        <ArtistContext.Provider value={value}>
            {children}
        </ArtistContext.Provider>
    );
};

export const useArtist = () => useContext(ArtistContext);
