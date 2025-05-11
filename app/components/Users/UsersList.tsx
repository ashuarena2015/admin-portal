import React, { FC, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store";

import DropDownPicker from 'react-native-dropdown-picker';
import AppText from "../Forms/AppText";

interface StudentsListProps {
    navigation: any;
}

const UsersList: FC<StudentsListProps> = ({ navigation }) => {

    const dispatch = useDispatch<AppDispatch>();
    // const router = useRouter();
    const { users, roleTypes } = useSelector((state: RootState) => state.users) || [];

    const [userList, setUserList] = useState<any[]>([]);

    const getClassesMapItems = (roles: any[]) => {
        return roles.map((item) => ({
            label: item.label,
            value: item.key,
        }));
    };
    const [open, setOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState('');

    const [userFilter, setUserFilter] = useState('');
    const [items, setItems] = useState([{ label: 'Head Principal', value: 'head_principal' }]);


    useEffect(() => {
        dispatch({
          type: 'apiRequest',
          payload: {
            url: 'http://localhost:3001/api/user',
            method: 'POST',
            onSuccess: 'users/getAllUsers',
            onError: 'GLOBAL_MESSAGE',
            dispatchType: 'getAllUsers',
            body: {
              userAll: 1,
              designation: userFilter,
            }
          },
        });
      }, [userFilter, dispatch]); // Run only once

    useEffect(() => {
        setUserList(users);
    }, [users]);

    useEffect(() => {
        setItems(getClassesMapItems(roleTypes));
    }, [roleTypes]);

    return (
        <View style={{ ...styles.container }}>
            <View style={{ marginBottom: 20 }}>
                <AppText style={{...styles.container_title }}>{users?.length} Users</AppText>
                <DropDownPicker
                    open={open}
                    value={userFilter}
                    items={items}
                    setOpen={setOpen}
                    setValue={setUserFilter}
                    setItems={setItems}
                    listMode="MODAL"
                    modalTitle="Select user"
                    modalProps={{
                        animationType: 'slide',
                        presentationStyle: 'formSheet',
                    }}
                    style={{ width: '100%', borderRadius: 8, borderColor: '#999' }}
                    dropDownContainerStyle={{ width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}
                />
            </View>
            <FlatList
                data={userList}
                renderItem={({item}) => {
                    return (
                        <View style={{...styles.infoView}} key={item.id}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={{ uri: `http://localhost:3001/uploads/${item.profilePhoto}` }}
                                    style={{ ...styles.infoView_image }}
                                />
                                <View style={{ maxWidth: '75%' }}>
                                    <AppText onPress={() => alert('hi')} style={{ ...styles.full_name }}>{item.firstName} {item.lastName}</AppText>
                                    <AppText style={{ ...styles.sub_info }}>#{item.userId}, {item.email}</AppText>
                                </View>
                            </View>
                            <View>
                                <AppText onPress={() => navigation.navigate('Profile')}>Go1</AppText>
                            </View>
                        </View>
                    );
                }}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingTop: 20,
        padding: 16,
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

export default UsersList;
