import {Character} from "@/constants/types";
import {Image, StyleSheet, Text, View} from "react-native";


export const CharacterCard = ({item}: { item: Character }) => (
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
});