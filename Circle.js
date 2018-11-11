import React from 'react'
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Animated,
} from 'react-native'

const images = [
  require(`./pngs/voice-ai-1.png`),
  require(`./pngs/voice-ai-2.png`),
  require(`./pngs/voice-ai-3.png`)
]

export default class Circle extends React.Component {
  spinValue = new Animated.Value(0)

  play = () => {
    Animated.sequence([
      Animated.timing(this.spinValue, {
        toValue: 1,
        duration: 3500,
      }),
      Animated.timing(this.spinValue, {
        toValue: 0,
        duration: 3500
      })
    ]).start(event => {
      if (event.finished) {
        this.play()
      }
    })
  }


  stop = () =>
    this.spinValue.stopAnimation((e) => console.log(e))

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: this.props.range
    })

    const bounce = i => this.spinValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [250, i === 2 ? 340 : 290, 250]
    })

    const animOpacity = this.spinValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.7, 0.4, 0.7]
    })

    const deg = i => this.spinValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [`${i * 3}deg`, `${i * 8}deg`, `${i * 3}deg`]
    })

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPressIn={() => this.play()}
          onPressOut={() => this.stop()}
        >
          <View
            style={{
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {[...Array(3).keys()].map(i =>
              <Animated.View key={i} style={{
                width: bounce(i),
                height: bounce(i),
                position: 'absolute',
                opacity: animOpacity,
                transform: [{ rotate: spin }]
              }}>
                <Animated.Image
                  style={[styles.box, {
                    width: bounce(i),
                    height: bounce(i),
                    zIndex: 180 - i,
                    transform: [{ rotate: deg(i) }]
                  }]}
                  source={images[i]}
                />
              </Animated.View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
