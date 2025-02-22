import { AxiosResponse } from 'axios';
import api from './axios';
import { Artist as ArtistResponse } from '@/types';


export const getArtistById = async (id: string): Promise<AxiosResponse<ArtistResponse>> => {
  return await api.get(`/api/artist/${id}`);
};

export const getArtist = async (): Promise<AxiosResponse<ArtistResponse[]>> => {
  return await api.get('/api/artist');
};

export const updateArtist = async (id: string, data: FormData): Promise<AxiosResponse<ArtistResponse>> => {
  return await api.put(`/api/artist/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const createArtist = async (data: FormData): Promise<AxiosResponse<ArtistResponse[]>> => {
  return await api.post('/api/artist', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};