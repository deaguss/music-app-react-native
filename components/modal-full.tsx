import { View, Text, Modal, TouchableOpacity, Image, TextInput } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { useModalFull } from '@/provider/modal-full-provider';

interface ModalFullProps {
    children?: React.ReactNode;
}

const ModalFull = ({ children }: ModalFullProps) => {
    const { isVisible, hideModal } = useModalFull();
    return (
        <Modal
            animationType="fade"
            transparent
            visible={isVisible}
            onRequestClose={hideModal}
        >
            <View className="flex-1 justify-center items-center">
                <LinearGradient
                    colors={['#393939', '#18181b', '#101010']}
                    locations={[0, 0.25, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className='w-full h-full'
                >
                    <View className=" p-5 flex-1 justify-center items-center">
                        {children}
                    </View>
                </LinearGradient>
            </View>
        </Modal>
    );
};

export default ModalFull;
