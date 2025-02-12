import icons from '@/constants/icons';
import React, { FC, memo } from 'react';
import { View, TextInput, TextInputProps, Image } from 'react-native';

interface SearchInputProps extends TextInputProps { }

const SearchInput: FC<SearchInputProps> = (props) => {
    return (
        <View className="flex-row items-center bg-[#292929] rounded-lg px-4 py-2.5">
            <Image source={icons.search} className='w-6 h-6' tintColor={"#CDCDE0"} />
            <TextInput
                className="ml-2 flex-1 text-white text-lgs"
                placeholder="Search music, artist"
                cursorColor={"#eab308"}
                placeholderTextColor="#6B7280"
                {...props}
            />
        </View>
    );
};

export default memo(SearchInput);
