import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import Icon from 'react-native-vector-icons/FontAwesome6';
import { MyList } from "../screens/MyList";
import { Details } from "../screens/Details";
import { Search } from "../screens/Search";

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {
    return (
        <Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#242a32",
                    height: 70,
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderTopColor: '#0296e5',
                },
                headerShown: false,
                tabBarActiveTintColor: '#0296e5',
                tabBarInactiveTintColor: '#67686d',
                tabBarShowLabel: false,
            }}
        >
            <Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name='house-chimney' color={color} size-={30} width="light" />
                    )
                }}
            />
            <Screen
                name="Details"
                component={Details}
                options={{
                    tabBarButton: () => null,
                }}
            />
            <Screen
                name="MyList"
                component={MyList}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name='bookmark-o' color={color} size-={30} width="light" />
                    )
                }}
            />
            <Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name='magnifying-glass' color={color} size-={30} width="light" />
                    )
                }}
            />
        </Navigator>
    )
}