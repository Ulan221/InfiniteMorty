import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { useCharacters } from "@/services/store/useInfiniteQuerry";
import {CharacterCard} from "@/src/entities/character.ui/CharacterCard";
import {Loader} from "@/src/shared/ui/loader";
import {Character} from "@/src/entities/character.ui/model/types";

export const CharacterList = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useCharacters();

    const characters = data?.pages.flatMap((page) => page.results) ?? [];

    if (isLoading) return <Loader message="Загрузка героев..." />;

    return (
        <FlashList
            data={characters}
            renderItem={({ item }) => <CharacterCard item={item} />}
            keyExtractor={(item: Character) => item.id.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }}
            ListFooterComponent={() => (
                isFetchingNextPage ? (
                    <View style={{ paddingVertical: 20 }}>
                        <ActivityIndicator size="small" color="#2c3e50"/>
                    </View>
                ) : null
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
        />
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
