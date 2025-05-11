import React, { FC, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store";
import DropDownPicker from 'react-native-dropdown-picker';
import AppText from "../Forms/AppText";
// import { API_URL, PHOTO_URL } from '@env';

const API_URL = 'https://my-school-app-backend.onrender.com/api';
const PHOTO_URL = 'https://my-school-app-backend.onrender.com/uploads';

interface StudentsListProps {
    navigation: any;
}

const StudentsList: FC<StudentsListProps> = ({ navigation }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { students, classes } = useSelector((state: RootState) => state.users) || [];

    const [studentList, setStudentList] = useState<any[]>([]);

    const getClassesMapItems = (classes: any[]) => {
        return classes.map((item) => ({
            label: item.label,
            value: item.key,
        }));
    };
    const [open, setOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState('REC-A');
    const [items, setItems] = useState([{ label: 'REC-A', value: 'REC-A' }]);


    useEffect(() => {
        dispatch({
          type: 'apiRequest',
          payload: {
            url: `${API_URL}/user`,
            method: 'POST',
            onSuccess: 'users/getAllStudents',
            onError: 'GLOBAL_MESSAGE',
            dispatchType: 'getAllStudents',
            body: {
              class_current: selectedClass,
            }
          },
        });
      }, [selectedClass, dispatch]); // Run only once

    useEffect(() => {
    setStudentList(students);
    }, [students]);

    useEffect(() => {
        setItems(getClassesMapItems(classes));
    }, [classes]);

    return (
        <View style={{ ...styles.container }}>
            <View style={{ marginBottom: 20 }}>
                <AppText style={{...styles.container_title }}>{students?.length} Students</AppText>
                <DropDownPicker
                    open={open}
                    value={selectedClass}
                    items={items}
                    setOpen={setOpen}
                    setValue={setSelectedClass}
                    setItems={setItems}
                    listMode="MODAL"
                    modalTitle="Select Class"
                    modalProps={{
                        animationType: 'slide',
                        presentationStyle: 'formSheet',
                    }}
                    style={{ width: '100%', borderRadius: 8, borderColor: '#999' }}
                    dropDownContainerStyle={{ width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}
                />
            </View>
            {studentList?.length ? <FlatList
                data={studentList}
                renderItem={({item}) => {
                    return (
                        <View style={{...styles.infoView}} key={item.id}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={{ uri: PHOTO_URL ? `${PHOTO_URL}/${item.profilePhoto}` : `${PHOTO_URL}/default-avatar.png` }}
                                    style={{ ...styles.infoView_image }}
                                />
                                <View style={{ maxWidth: '75%' }}>
                                    <AppText onPress={() => alert('hi')} style={{ ...styles.full_name }}>{item.firstName} {item.lastName}</AppText>
                                    <AppText style={{ ...styles.sub_info }}>#{item.userId}, {item.email}</AppText>
                                </View>
                            </View>
                            <View>
                                <AppText onPress={() => navigation.navigate('Profile', { id: item.userId })}>Go</AppText>
                            </View>
                        </View>
                    );
                }}
                keyExtractor={item => item.id}
            /> : <AppText>No result found!</AppText>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        marginBottom: 24,
    },
    container_title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    infoView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        justifyContent: 'space-between',
    },
    full_name: {
        fontSize: 18,
        color: '#333',
    },
    sub_info: {
        fontSize: 14,
        color: '#666',
    },
    infoView_image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
});

export default StudentsList;
