import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    Button,
    Animated,
    Easing
} from "react-native";


export default class AnimatedParalel extends Component {
    constructor(props) {
        super(props)
        this.animatedValue1 = new Animated.Value(0)
        this.animatedValue2 = new Animated.Value(0)
        this.animatedValue3 = new Animated.Value(0)
    }

    componentDidMount() {
        this.animate()
    }

    animate = () => {
        // if (event === null) { return }
        // if (event.nativeEvent.state === State.ACTIVE) {
        //     //animate
        // }

        console.log("is pressed")
        this.animatedValue1.setValue(0)
        this.animatedValue2.setValue(0)
        this.animatedValue3.setValue(0)
        const createAnimation = function (value, duration, easing, delay = 0) {
            return Animated.timing(
                value,
                {
                    toValue: 1,
                    duration,
                    easing,
                    delay,
                }
            )
        }
        Animated.parallel([
            createAnimation(this.animatedValue1, 700, Easing.inOut(Easing.sin)),
            createAnimation(this.animatedValue2, 900, Easing.inOut(Easing.sin)),
            createAnimation(this.animatedValue3, 1100, Easing.inOut(Easing.sin))
        ]).start()
    }

    render() {
        const introText1 = this.animatedValue1.interpolate({
            inputRange: [0, 1],
            outputRange: [-200, 0]
        })
        const introText2 = this.animatedValue2.interpolate({
            inputRange: [0, 1],
            outputRange: [-200, 0]
        })
        const introButton = this.animatedValue3.interpolate({
            inputRange: [0, 1],
            outputRange: [-200, 0]
        })
        return (
            <View style={styles.container}>
                <Animated.Text style={[styles.title,  {left: introText1}]}>
                    <Text>Welcome to React Native</Text>
                </Animated.Text>
                <Animated.Text style={[styles.body, {left: introText2}]}>
                    <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                </Animated.Text>
                <Animated.View style={{left: introButton,}}>
                    <Button
                        title={"Re-Animate"}
                        onPress={this.animate}
                    />
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginHorizontal: 25,
        marginVertical: 5,
    },
    body: {
        fontSize: 17,
        marginHorizontal: 25,
        marginVertical: 5,


    }
})