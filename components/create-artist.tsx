import { View, Text, Modal, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import icons from '@/constants/icons';
import { CustomButton, ModalFull } from '@/components';
import { useModalFull } from '@/provider/modal-full-provider';
import { useArtist } from '@/context/artist-context';
import * as ImagePicker from 'expo-image-picker';

const CreateArtist = () => {
    const { createArtist, loading, error, clearError } = useArtist();
    const { hideModal, isVisible } = useModalFull();

    const [formState, setFormState] = useState({
        name: '',
        biography: '',
        image: null as string | null
    });

    const resetForm = useCallback(() => {
        setFormState({
            name: '',
            biography: '',
            image: null
        });
    }, []);

    useEffect(() => {
        return () => {
            resetForm();
        };
    }, [clearError, resetForm]);

    const handleImagePick = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                setFormState(prev => ({
                    ...prev,
                    image: result.assets[0].uri
                }));
            }
        } catch (error) {
            console.error('Error saat memilih gambar:', error);
        }
    };

    const handleSubmit = async () => {
        if (!formState.name.trim() || !formState.biography.trim()) {
            return;
        }

        const formData = new FormData();
        formData.append('name', formState.name.trim());
        formData.append('biography', formState.biography.trim());

        if (formState.image) {
            formData.append('image', {
                uri: formState.image,
                name: 'image.jpg',
                type: 'image/jpeg',
            } as any);
        }

        try {
            clearError('create');
            await createArtist(formData);
            hideModal();
            resetForm();
        } catch (error) {
            // Error sudah ditangani di context
        }
    };

    if (!isVisible) return null;

    return (
        <ModalFull>
            <Text className="text-lg font-bold mb-4 text-[#CDCDE0]">
                Register Artist
            </Text>

            <TouchableOpacity
                onPress={handleImagePick}
                className="w-24 h-24 bg-[#CDCDE0]/70 rounded-full justify-center items-center self-center mb-5"
            >
                {formState.image ? (
                    <Image
                        source={{ uri: formState.image }}
                        className="w-24 h-24 rounded-full"
                    />
                ) : (
                    <Image
                        source={icons.camera}
                        className="w-5 h-5 opacity-75"
                        style={{ tintColor: "#1E1E1E" }}
                    />
                )}
            </TouchableOpacity>

            <TextInput
                placeholder="Name"
                placeholderTextColor="#CDCDE0"
                value={formState.name}
                onChangeText={(text) => setFormState(prev => ({ ...prev, name: text }))}
                className="border-b border-[#CDCDE0]/80 w-full mb-4 py-1 px-1 text-[#CDCDE0] h-10"
            />

            <TextInput
                placeholder="Biography"
                placeholderTextColor="#CDCDE0"
                value={formState.biography}
                onChangeText={(text) => setFormState(prev => ({ ...prev, biography: text }))}
                multiline
                className="border-b border-[#CDCDE0]/80 w-full mb-4 py-1 px-1 text-[#CDCDE0] h-[60px]"
            />

            {error?.create && (
                <Text className="text-red-500 mb-2">{error.create}</Text>
            )}

            <View className="flex flex-row justify-center items-center mt-10 gap-10">
                <CustomButton
                    handlePress={hideModal}
                    containerStyles="items-center w-1/3 min-h-[60px] rounded-full"
                    title='Close'
                    variant='ghost'
                />
                <CustomButton
                    title="Create"
                    containerStyles="min-h-[50px] w-1/3 rounded-full"
                    handlePress={handleSubmit}
                    isLoading={loading.create}
                />
            </View>
        </ModalFull>
    );
};

export default CreateArtist;