import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {useCharacterStore} from "@/services/store/useCharacterStore";
import {useEffect, useState} from "react";
import {Character} from "@/constants/types";
import {FlashList} from "@shopify/flash-list";

export default function HomeScreen() {
    const {characters, fetchCharacters} = useCharacterStore();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const load = async () => {
            try {
                await fetchCharacters();
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        void load();
    }, [fetchCharacters]);

    const renderHero = ({item}: { item: Character }) => (
        <View style={styles.card}>
            <Image
                source={{uri: item.image}}
                style={styles.avatar}
            />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.species} — {item.status}</Text>
            </View>
        </View>
    );

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#2c3e50"/>
                <Text style={{marginTop: 10}}>Загрузка героев...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlashList
                data={characters}
                renderItem={renderHero}
                keyExtractor={(item: Character) => item.id.toString()}

                onEndReachedThreshold={0.5}
                onEndReached={fetchCharacters}

                ListFooterComponent={() => (
                    <View style={{ paddingVertical: 20 }}>
                        <ActivityIndicator size="small" color="#2c3e50" />
                    </View>
                )}

                contentContainerStyle={{paddingBottom: 20}}

            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
        paddingTop: 40,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    info: {
        marginLeft: 15,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    description: {
        color: '#7f8c8d',
        marginTop: 4,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
    },
});
