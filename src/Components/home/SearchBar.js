import React from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';

const SearchBar = ({
    Search,
    setSearch,
    notes,
    filterNotes,
    setFilterNotes }) => {
    const searchFilter = (text) => {
        if (text) {
            const newData = notes.filter((item) => {
                if (item != null) {
                    const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                }

            });
            setFilterNotes(newData);
            setSearch(text)

        }
        else {
            setFilterNotes(notes);
            setSearch(text)

        }
    }
    return (
        <View style={styles.Container}>
            <TextInput
                placeholder="Search Notes..."
                placeholderTextColor="black"
                onChangeText={val => searchFilter(val)}
                autoCapitalize='none'
                style={styles.InputTextStyle}
                value={Search}
            />
        </View>
    );
};

export default SearchBar;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    Container: {
        height: height * 0.1,
        paddingHorizontal: 20,
        paddingVertical: 10,

    },
    InputTextStyle: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: width,
        paddingHorizontal: 15,
        fontSize: height * 0.0190,
        elevation: 3,
        backgroundColor: '#fff',
        color: "#000"
    },
});
