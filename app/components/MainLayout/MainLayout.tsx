import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <View style={styles.sectionContainer}>
            <View style={{ position: 'relative', zIndex: 2 }}>
                {children}
            </View>
            {/* <View style={styles.tiltedBackground} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        flexGrow: 1,
        backgroundColor: '#3D365C',
        flex: 1,
        height: '100%',
        color: '#fff'
    },
    // tiltedBackground: {
    //   position: 'absolute',
    //   zIndex: 1,
    //   width: '200%',
    //   height: '100%',
    //   top: '-35%',
    //   backgroundColor: '#27445D',
    //   transform: [
    //     { rotate: '-80deg' }
    //   ],
    // },
});

export default MainLayout;
