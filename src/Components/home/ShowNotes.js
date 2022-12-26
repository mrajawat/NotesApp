import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { CusColor } from '../../Colors/CusColor';

const ShowNotes = ({
    index,
    editNotes,
    setEditNotes,
    noteShow,
    setNoteShow,
    setFilterNotes,
    notes,
    setNotes,
}) => {
    const [editTitle, setEditTitle] = useState(notes[index].title);
    const [editDec, setEditDec] = useState(notes[index].description);

    const saveNotes = async (editTitle, editDec, index) => {
        let modifiedNote = notes;
        modifiedNote[index].title = editTitle;
        modifiedNote[index].description = editDec;

        setNotes(modifiedNote);
        setFilterNotes(modifiedNote);
        await AsyncStorage.setItem('notes', JSON.stringify(modifiedNote));
    };
    return (
        <Modal animationType="slide" transparent={true} visible={noteShow}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => {
                        setEditNotes(!editNotes);
                        setNoteShow(!noteShow);
                    }}
                    activeOpacity={0.8}
                    style={styles.CrossButton}>
                    <Text style={styles.CrossButtonText}>X</Text>
                </TouchableOpacity>

                <View style={styles.MainContainer}>
                    <ScrollView contentContainerStyle={styles.Container}>
                        <View style={styles.TitleContainer}>
                            {editNotes ? (
                                <TextInput
                                    placeholder="Enter Your Title"
                                    multiline
                                    style={styles.TitleContainerEdit}
                                    value={editTitle}
                                    onChangeText={text => setEditTitle(text)}
                                />
                            ) : (
                                <Text style={styles.TitleText}>
                                    {editTitle}
                                </Text>
                            )}
                        </View>
                        <View style={styles.NotesContainer}>
                            {editNotes ? (
                                <TextInput
                                    placeholder="Enter Your Notes"
                                    multiline
                                    style={styles.NotesContainerEdit}
                                    value={editDec}
                                    onChangeText={text => setEditDec(text)}
                                />
                            ) : (
                                <Text style={styles.NotesText}>{editDec}</Text>
                            )}
                        </View>
                        {editNotes ? (
                            <TouchableOpacity
                                onPress={() => {
                                    setEditNotes(!editNotes);
                                    setNoteShow(!noteShow);
                                    saveNotes(editTitle, editDec, index);
                                }}
                                style={styles.SaveButton}>
                                <Text style={styles.SaveButtonText}>
                                    Update
                                </Text>
                            </TouchableOpacity>
                        ) : null}
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default ShowNotes;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    CrossButton: {
        position: 'absolute',
        right: 20,
        top: 30,
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: CusColor.lightbrown,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    CrossButtonText: {
        color: '#fff',
        fontSize: height * 0.019,
        fontWeight: '900',
        fontSize: 24
    },
    MainContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    Container: {
        width: width * 0.9,
        backgroundColor: CusColor.lightpink,
        elevation: 5,
        borderRadius: 20,
        overflow: 'hidden',
    },
    TitleContainer: {
        height: height * 0.1,
        backgroundColor: CusColor.lightpink,
        elevation: 10,
        color: '#000',
    },
    NotesContainer: {
        height: height * 0.5,
        backgroundColor: CusColor.lightpink,
        elevation: 2,
        textAlignVertical: 'top',
        color: '#000',
    },
    TitleText: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: height * 0.025,
        color: '#000',
        fontWeight: "800"
    },
    NotesText: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: height * 0.020,
        color: '#000',
    },
    TitleContainerEdit: {
        height: '100%',
        fontSize: height * 0.02,
        paddingHorizontal: 20,
        backgroundColor: CusColor.lightpink,
        color: '#000',
        fontWeight: "bold"

    },
    NotesContainerEdit: {
        height: '100%',
        fontSize: height * 0.017,
        paddingHorizontal: 20,
        backgroundColor: CusColor.lightpink,
        textAlignVertical: 'top',
        color: '#000',
    },
    SaveButton: {
        width: 200,
        height: 50,
        marginVertical: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 5,
        backgroundColor: CusColor.lightbrown,
    },
    SaveButtonText: {
        color: '#000',
        fontWeight: '600',
        fontSize: height * 0.02,
    },
});