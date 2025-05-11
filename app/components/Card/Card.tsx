import { FC } from 'react';

import { Image, StyleSheet, View } from 'react-native';
import AppText from '../Forms/AppText';

interface CardProps {
    title: string;
    content: string;
    image: string;
    customStyles: object;
    customStylesHeading1?: object;
    customStylesHeading2?: object;
}

const Card: FC<CardProps> = ({ title, content, image, customStyles, customStylesHeading1, customStylesHeading2 }) => {

    const viewStyles = image ? { ...styles.card, ...customStyles, ...styles.card_flex } : { ...styles.card, ...customStyles };

    return (
        <View style={{ ...viewStyles }}>
            {image ? <Image
                source={{ uri: image }}
                width={100}
                height={100}
                style={{ ...styles.card_image }}
                resizeMode="cover"
                alt={title}
            /> : null}
            <View>
                <AppText style={{...customStylesHeading1}}>{title}</AppText>
                <AppText style={{...customStylesHeading2}}>{content}</AppText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fff',
        padding: 16,
        marginBottom: 16,
        shadowColor: '#999',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
        gap: 8,
        justifyContent: 'center',
    },
    card_flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    card_image: {
        width: 100,
        height: 100,
        borderRadius: '50%',
        marginRight: 8,
    },
});
export default Card;
