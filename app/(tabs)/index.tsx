import { StyleSheet, View } from 'react-native';
import {CharacterList} from "@/src/widgets/character-list/ui/CharacterList";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <CharacterList></CharacterList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
});
