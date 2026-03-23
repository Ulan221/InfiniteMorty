import {Image, StyleSheet, Text, View} from "react-native";
import {Character} from "@/src/entities/character.ui/model/types";
import Animated, {
    FadeInDown,
    interpolateColor, useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from "react-native-reanimated";
import {useEffect} from "react";
import {Gesture, GestureDetector} from "react-native-gesture-handler";


export const CharacterCard = ({item}: { item: Character }) => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0);
    const isPressed = useSharedValue(0);

    const panGesture = Gesture.Pan()
        .onBegin(() => {
            scale.value = withTiming(0.95, {duration: 100});
            isPressed.value = withTiming(1, {duration: 100});
        })
        .onChange((event) => {
        })
        .onFinalize(() => {
            scale.value = withSpring(1);
            isPressed.value = withTiming(0, {duration: 100});
        });

    const animatedStyle = useAnimatedStyle(() => {
        const bgColor = interpolateColor(
            isPressed.value,
            [0, 1],
            ['#ffffff', '#ffebee']
        );

        return {
            transform: [
                {scale: scale.value},
            ],
            opacity: opacity.value,
            backgroundColor: bgColor,
        };
    });

    useEffect(() => {
        opacity.value = withTiming(1, {duration: 1000});
    }, []);

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View
                style={[styles.card, animatedStyle]}
                entering={FadeInDown.delay(200).duration(500).springify()}>
                <Image source={{uri: item.image}} style={styles.avatar}/>
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.description}>{item.species} — {item.status}</Text>
                </View>
            </Animated.View>
        </GestureDetector>
    );
};

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
