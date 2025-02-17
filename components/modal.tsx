import React, { memo } from 'react'
import { Modal as RNModal, View, StyleSheet, Text, Platform } from 'react-native'
import { Gesture, GestureDetector, Directions } from 'react-native-gesture-handler'
import { useModal } from '@/provider/modal-provider'

interface ModalProps {
    children?: React.ReactNode
}

const SWIPE_VELOCITY_THRESHOLD = 500
const SWIPE_DISTANCE_THRESHOLD = 50

const ModalComponent = ({ children }: ModalProps) => {
    const { isVisible, hideModal } = useModal()

    const swipeGesture = Gesture.Pan()
        .onEnd(({ velocityY, translationY }) => {
            if (
                (translationY > SWIPE_DISTANCE_THRESHOLD && velocityY > SWIPE_VELOCITY_THRESHOLD) ||
                translationY > SWIPE_DISTANCE_THRESHOLD * 2
            ) {
                hideModal()
            }
        })

    return (
        <RNModal
            animationType="slide"
            transparent
            visible={isVisible}
            onRequestClose={hideModal}
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                {/* Handle bar untuk visual feedback */}
                <View style={styles.handleBar} />

                <GestureDetector gesture={swipeGesture}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.instructionText}>
                            Geser ke bawah untuk menutup
                        </Text>
                        {children}
                    </View>
                </GestureDetector>
            </View>
        </RNModal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 24,
        paddingTop: 16,
        maxHeight: '90%',
        minHeight: '40%',
    },
    handleBar: {
        width: 40,
        height: 4,
        backgroundColor: '#ddd',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 12,
        marginTop: 8,
    },
    instructionText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 16,
    },
})

export default memo(ModalComponent)