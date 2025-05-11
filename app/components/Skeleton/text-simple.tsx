import { FC } from 'react';
import { View } from 'react-native';

interface SimpleTextSkeletonProps {
    width?: number;
    height?: number;
    bgColor?: string;
}

const SimpleTextSkeleton: FC<SimpleTextSkeletonProps> = ({ width, height, bgColor}) => {
    return (
        <View style={{ width: width || 100, height: height || 16, backgroundColor: bgColor || '#e2e2e2', borderRadius: 8, marginBottom: 8 }}></View>
    )
}

export default SimpleTextSkeleton;
