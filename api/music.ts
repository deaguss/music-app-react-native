import { AxiosResponse } from 'axios';
import api from './axios';
import { TrackResponse } from '@/types';


export const getTrack = async (id: string): Promise<AxiosResponse<TrackResponse>> => {
  return await api.get(`/api/track/${id}`);
};

export const getQueue = async (): Promise<AxiosResponse<TrackResponse[]>> => {
  return await api.get('/api/track');
};