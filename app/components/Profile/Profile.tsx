import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../services/store'
import { API_URL, PHOTO_URL } from "@env";
import AppText from '../Forms/AppText';
import SimpleTextSkeleton from '../Skeleton/text-simple';

// const API_URL = 'https://my-school-app-backend.onrender.com/api';
// const PHOTO_URL = 'https://my-school-app-backend.onrender.com/uploads';

interface ProfileProps {
    navigation?: any
}

const Profile: FC<ProfileProps> = ({ navigation }) => {

    const route = useRoute();
    const { account } = useSelector((state: RootState) => state.accounts);

    console.log({account});
    // const [isProfileLoading, setIsProfileLoading] = useState<boolean>(true)

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         await dispatch({
    //           type: "apiRequest",
    //           payload: {
    //             url: `${API_URL}/user/${id}`,
    //             method: "GET",
    //             onError: "GLOBAL_MESSAGE",
    //             dispatchType: "getUserDetail",
    //           },
    //         });
    //         // if(response) {
    //             setIsProfileLoading(false);
    //         // }
    //       } catch (err) {
    //         console.error("Dispatch error:", err);
    //       }
    //     };
    //     fetchData();
    // }, []);

    return (
        <View style={styles.container}>
            <AppText>Profile page</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 32,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        paddingTop: 32,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 32,
    },
});

export default Profile;