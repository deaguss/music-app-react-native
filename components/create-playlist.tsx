import { View, Text, Modal, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons';
import { CustomButton } from '@/components';

interface CreatePlaylistProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePlaylist = ({ modalVisible, setModalVisible }: CreatePlaylistProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCloseModal = () => setModalVisible(false);
    const handleSubmit = () => {
        console.log({ title, description });
        setModalVisible(false);
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCloseModal}
        >
            <View className="flex-1 justify-center items-center">
                <View className="w-11/12 bg-[#1E1E1E] rounded-2xl p-5">
                    <Text className="text-lg font-bold mb-4 text-[#CDCDE0]">
                        Create Playlist
                    </Text>

                    <TouchableOpacity
                        className="w-24 h-24 bg-[#CDCDE0]/70 rounded-full justify-center items-center self-center mb-5"
                        onPress={() => {
                            // Tambahkan fungsi untuk memilih image
                        }}
                    >
                        <Image
                            source={icons.camera}
                            className="w-5 h-5 opacity-75"
                            style={{ tintColor: "#1E1E1E" }}
                        />
                    </TouchableOpacity>

                    <TextInput
                        placeholder="Title"
                        placeholderTextColor="#CDCDE0"
                        value={title}
                        onChangeText={setTitle}
                        style={{ height: 40 }}
                        className="border-b border-[#CDCDE0]/80 mb-4 py-1 px-1 text-[#CDCDE0]"
                    />

                    <TextInput
                        placeholder="Description"
                        placeholderTextColor="#CDCDE0"
                        value={description}
                        onChangeText={setDescription}
                        multiline={true}
                        className="border-b border-[#CDCDE0]/80 mb-6 py-1 px-1 text-[#CDCDE0]"
                        style={{ height: 50 }}
                    />

                    <CustomButton
                        title="Create"
                        containerStyles='min-h-[50px] mt-10'
                        handlePress={handleSubmit}
                    />

                    <TouchableOpacity
                        onPress={handleCloseModal}
                        className="items-center mt-4"
                    >
                        <Text className="text-[#eab308] font-bold">Close</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </Modal>
    )
}

export default CreatePlaylist