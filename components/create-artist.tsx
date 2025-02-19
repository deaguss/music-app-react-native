import { View, Text, Modal, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import icons from '@/constants/icons';
import { CustomButton, ModalFull } from '@/components';
import { useModalFull } from '@/provider/modal-full-provider';

const CreateArtist = () => {
    const [name, setName] = useState('');
    const [biography, setBiography] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const { hideModal, isVisible } = useModalFull();

    if (!isVisible) return null;

    const handleSubmit = () => {
        console.log({ name, biography, imageUrl });
        hideModal();
    };

    return (
        <ModalFull>
            <Text className="text-lg font-bold mb-4 text-[#CDCDE0]">
                Register Artist
            </Text>

            <TouchableOpacity
                onPress={() => {
                    // Tambahkan fungsi untuk memilih/memasukkan URL gambar
                }}
                className="w-24 h-24 bg-[#CDCDE0]/70 rounded-full justify-center items-center self-center mb-5"
            >
                {imageUrl ? (
                    <Image
                        source={{ uri: imageUrl }}
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
                value={name}
                onChangeText={setName}
                className="border-b border-[#CDCDE0]/80 w-full mb-4 py-1 px-1 text-[#CDCDE0] h-10"
            />

            <TextInput
                placeholder="Biography"
                placeholderTextColor="#CDCDE0"
                value={biography}
                onChangeText={setBiography}
                multiline
                className="border-b border-[#CDCDE0]/80 w-full mb-4 py-1 px-1 text-[#CDCDE0] h-[60px]"
            />

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
                />
            </View>
        </ModalFull>
    );
};

export default CreateArtist;
