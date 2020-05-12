import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Animated,
    Image,
    Text,
    Easing
} from "react-native";

import { State, TapGestureHandler } from "react-native-gesture-handler";

export default class AnimatedSpring extends Component {
    constructor(props) {
        super(props)
        this.springValue = new Animated.Value(1)
    }

    componentDidMount() {
        this.spring()
    }

    spring = (event) => {
        if (event == null) { return }
        if (event.nativeEvent.state === State.END) {
            this.springValue.setValue(0.3)
            Animated.spring(
                this.springValue,
                {
                    toValue: 1,
                    friction: 1,
                    useNativeDriver: true,
                }
            ).start()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TapGestureHandler
                    onHandlerStateChange={this.spring}>
                    <Animated.Image
                        style={{ width: 227, height: 200, transform: [{ scale: this.springValue }] }}
                        source={{ uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' }} />
                </TapGestureHandler>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})