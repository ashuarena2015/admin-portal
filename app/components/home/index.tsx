import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Home from './home';
import WithAuthLayout from '../HOC/WithAuth';
import { RootState } from '@/app/services/reducers';

interface HomePageProps {
    navigation?: object;
}

const HomePageAuth = WithAuthLayout((props: HomePageProps) => <Home {...props} navigation={props?.navigation} />);

const HomePage: FC<HomePageProps> = ({ navigation }) => {
    const { loginUser } = useSelector((state: RootState) => state.users);
    return (
        <HomePageAuth navigation={navigation} loginUser={loginUser} />
    )
}

export default HomePage;