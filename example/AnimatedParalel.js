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
        this.animatedOpacity = new Animated.Value(0)
        this.animatedTitle = new Animated.Value(0)
        this.animatedBody = new Animated.Value(0)
        this.animatedButton = new Animated.Value(0)
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
        this.animatedOpacity.setValue(0)
        this.animatedTitle.setValue(0)
        this.animatedBody.setValue(0)
        this.animatedButton.setValue(0)
        const createAnimation = function (value, duration, easing, delay = 0) {
            return Animated.timing(
                value,
                {
                    toValue: 1,
                    duration,
                    easing,
                    delay,
                    useNativeDriver: true
                }
            )
        }
        Animated.parallel([
            createAnimation(this.animatedOpacity, 700, Easing.inOut(Easing.sin)),
            createAnimation(this.animatedTitle, 700, Easing.inOut(Easing.sin)),
            createAnimation(this.animatedBody, 900, Easing.inOut(Easing.sin)),
            createAnimation(this.animatedButton, 1100, Easing.inOut(Easing.sin))
        ]).start()
    }

    render() {
        const introOpacity = this.animatedOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })
        const introText1 = this.animatedTitle.interpolate({
            inputRange: [0, 1],
            outputRange: [-200, 0]
        })
        const introText2 = this.animatedBody.interpolate({
            inputRange: [0, 1],
            outputRange: [-200, 0]
        })
        const introButton = this.animatedButton.interpolate({
            inputRange: [0, 1],
            outputRange: [-200, 0]
        })
        return (
            <View style={styles.container}>
                <Animated.Text style={[styles.title,  {opacity:introOpacity ,transform: [{translateX:introText1}]}]}>
                    <Text>Welcome to React Native</Text>
                </Animated.Text>
                <Animated.Text style={[styles.body, {opacity:introOpacity, transform: [{translateX:introText2}]}]}>
                    <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                </Animated.Text>
                <Animated.View style={{opacity:introOpacity, transform: [{translateX:introButton}]}}>
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
        marginHorizontal: 20,
        marginVertical: 5,
    },
    body: {
        fontSize: 17,
        marginHorizontal: 20,
        marginVertical: 5,


    }
})