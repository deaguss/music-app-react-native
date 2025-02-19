import React, { memo } from 'react';
import { Modal as RNModal, View, Text } from 'react-native';
import {
    Gesture,
    GestureDetector,
    gestureHandlerRootHOC,
    GestureHandlerRootView
} from 'react-native-gesture-handler';
import { useModal } from '@/provider/modal-provider';

interface ModalProps {
    children?: React.ReactNode;
}

const SWIPE_VELOCITY_THRESHOLD = 300;
const SWIPE_DISTANCE_THRESHOLD = 30;

const ModalContent = ({ children, hideModal }: { children?: React.ReactNode; hideModal: () => void; }) => {
    const swipeGesture = Gesture.Pan()
        .activeOffsetY([-10, 10])
        .onEnd(({ velocityY, translationY }) => {
            if (
                translationY > SWIPE_DISTANCE_THRESHOLD ||
                velocityY > SWIPE_VELOCITY_THRESHOLD
            ) {
                hideModal();
            }
        });

    return (
        <View
            className="flex-1 justify-end bg-black/40 bg-opacity-40"
            onStartShouldSetResponder={() => true}
        >
            <View className="w-10 h-1 bg-zinc-100 rounded self-center mt-2 mb-3" />
            <GestureDetector gesture={swipeGesture}>
                <View className="bg-zinc-900 rounded-t-xl p-6 pt-4 h-[40%] min-h-[40%] pb-10">
                    <Text className="text-sm text-zinc-300 text-center mb-4">
                        Swipe down to close
                    </Text>
                    <View>{children}</View>
                </View>
            </GestureDetector>
        </View>

    );
};

const WrappedModalContent = gestureHandlerRootHOC(ModalContent);

const ModalComponent = ({ children }: ModalProps) => {
    const { isVisible, hideModal } = useModal();

    return (
        <RNModal
            animationType="slide"
            transparent
            visible={isVisible}
            onRequestClose={hideModal}
            statusBarTranslucent
            onPointerEnter={() => console.log("testing")}
        >

            <GestureHandlerRootView style={{ flex: 1 }}>
                <WrappedModalContent hideModal={hideModal}>
                    {children}
                </WrappedModalContent>
            </GestureHandlerRootView>
        </RNModal>
    );
};

export default memo(ModalComponent);
