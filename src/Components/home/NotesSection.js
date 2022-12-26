import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ShowNotes from './ShowNotes';
import Cuscolor, { CusColor } from '../../Colors/CusColor'

const NotesSection = ({ filterNotes, setFilterNotes, notes, setNotes }) => {
    const [noteShow, setNoteShow] = useState(false);
    const [index, setIndex] = useState();
    const [editNotes, setEditNotes] = useState(false);

    const deleteNotes = async index => {
        const tempNotes = notes;
        tempNotes.splice(index, 1);
        setFilterNotes([...tempNotes]);
        setNotes([...tempNotes]);
        await AsyncStorage.setItem('notes', JSON.stringify(tempNotes));
    };

    return (
        <>
            <View style={styles.Container}>
                <FlatList
                    data={filterNotes}
                    numColumns={2}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setIndex(index);
                                setNoteShow(!noteShow);
                            }}
                            activeOpacity={0.7}
                            style={styles.listContainer}>
                            <Text style={styles.DateText}>{item.date}</Text>
                            <Text style={styles.TitleText}> {item.title} </Text>
                            <Text style={styles.DescriptionText}>
                                {item.description}
                            </Text>
                            <View style={styles.IconContainer}>
                                <Icon
                                    name="square-edit-outline"
                                    color="#000"
                                    size={height * 0.03}
                                    style={styles.EditIcon}
                                    onPress={() => {
                                        setIndex(index);
                                        setNoteShow(!noteShow);
                                        setEditNotes(true);
                                    }}
                                />
                                <Icon2
                                    name="delete-outline"
                                    color="black"
                                    size={height * 0.03}
                                    style={styles.DeleteIcon}
                                    onPress={() => deleteNotes(index)}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={() => (
                        <Text style={styles.None}>No Notes available</Text>
                    )}
                />
            </View>
            {noteShow || editNotes ? (
                <ShowNotes
                    index={index}
                    editNotes={editNotes}
                    setEditNotes={setEditNotes}
                    noteShow={noteShow}
                    setNoteShow={setNoteShow}
                    setFilterNotes={setFilterNotes}
                    notes={notes}
                    setNotes={setNotes}
                />
            ) : null}
        </>
    );
};

export default NotesSection;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    listContainer: {
        width: width / 2 - 20,
        height: height * 0.2,
        borderRadius: 15,
        margin: 10,
        elevation: 10,
        backgroundColor: CusColor.lightpink,
        padding: 20,
    },
    DateText: {
        flex: 0.5,
        textAlign: 'right',
        marginBottom: 5,
        fontSize: height * 0.013,
        color: '#000',
    },
    TitleText: {
        flex: 1,
        fontSize: height * 0.017,
        fontWeight: '500',
        color: '#000',
        marginBottom: 2,
    },
    DescriptionText: {
        flex: 2,
        fontSize: height * 0.014,
        fontWeight: '400',
        color: '#000',

    },
    None: {
        color: '#000',
        fontSize: height * 0.02,
        textAlign: 'center',
        marginTop: 10,
    },
    IconContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 5,
        left: 10,
    },
    EditIcon: {

        padding: 10,
    },
    DeleteIcon: {
        padding: 10,
    },
});