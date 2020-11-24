import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, Vibration, Text, PermissionsAndroid,} from 'react-native';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';
import TrackPlayer from 'react-native-track-player';
import {
  LongPressGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';

const widthPhone = Dimensions.get("window").width;
const heightPhone = Dimensions.get("window").height;

const story = "Once upon a time, long, long ago a king and queen ruled over a distant land.  The queen was kind and lovely and all the people of the realm adored her.  The only sadness in the queen's life was that she wished for a child but did not have one. One winter day, the queen was doing needle work while gazing out her ebony window at the new fallen snow.  A bird flew by the window startling the queen and she pricked her finger.  A single drop of blood fell on the snow outside her window.  As she looked at the blood on the snow she said to herself, Oh, how I wish that I had a daughter that had skin as white as snow, lips as red as blood, and hair as black as ebony. Soon after that, the kind queen got her wish when she gave birth to a baby girl who had skin white as snow, lips red as blood, and hair black as ebony.  They named the baby princess Snow White, but sadly, the queen died after giving birth to Snow White. Soon after, the king married a new woman who was beautiful, but as well proud and cruel.  She had studied dark magic and owned a magic mirror, of which she would daily ask, Mirror, mirror on the wall, who's the fairest of them all? Each time this question was asked, the mirror would give the same answer, Thou, O Queen, art the fairest of all.  This pleased the queen greatly as she knew that her magical mirror could speak nothing but the truth."

export class PressBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pitch : '',
            error: '',
            end: '',
            started: '',
            results: [],
            ttsResults: '',
            partialResults: [],
            story:['alice in wonderland','sherlock holmes','snow white'],
        };

        Voice.onSpeechStart = this.onSpeechStart;
        Voice.onSpeechEnd = this.onSpeechEnd;
        Voice.onSpeechError = this.onSpeechError;
        Voice.onSpeechResults = this.onSpeechResults;
        Voice.onSpeechPartialResults = this.onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
    }

    componentDidUpdate() {
      Voice.onSpeechStart = this.onSpeechStart;
      Voice.onSpeechEnd = this.onSpeechEnd;
      Voice.onSpeechError = this.onSpeechError;
      Voice.onSpeechResults = this.onSpeechResults;
      Voice.onSpeechPartialResults = this.onSpeechPartialResults;
      Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
      this.requestExternalStorageRead();

      // Tts.addEventListener(
      //   'tts-start',
      //   (_event) => this.setState({ttsStatus: 'started'})
      // );
      // Tts.addEventListener(
      //   'tts-finish',
      //   (_event) => {
      //     this.setState({ttsStatus: 'finished'})
      //   }
      // );
      // Tts.addEventListener(
      //   'tts-cancel',
      //   (_event) => this.setState({ttsStatus: 'cancelled'})
      // );

      return () => {
        //destroy the process after switching the screen
        Voice.destroy().then(Voice.removeAllListeners);
        
        // Tts.removeEventListener(
        //   'tts-start',
        //   (_event) => this.setState({ttsStatus: 'started'})
        // );
        // Tts.removeEventListener(
        //   'tts-finish',
        //   (_event) => this.setState({ttsStatus: 'finished'})
        // );
        // Tts.removeEventListener(
        //   'tts-cancel',
        //   (_event) => this.setState({ttsStatus: 'cancelled'})
        // );
      };
    }

    async requestExternalStorageRead() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            'title': 'Cool App ...',
            'message': 'App needs access to external storage'
          }
        );
  
        return granted == PermissionsAndroid.RESULTS.GRANTED
      }
      catch (err) {
        //Handle this error
        return false;
      }
    }

    onSpeechStart = (e) => {
        //Invoked when .start() is called without error
     //   console.log('onSpeechStart: ', e);
        this.setState({started: '√'});
    };
    
    onSpeechEnd = (e) => {
        //Invoked when SpeechRecognizer stops recognition
        console.log('ornSpeechEnd: ', e);
        this.setState({end: '√'});
    };
    
    onSpeechError = (e) => {
        //Invoked when an error occurs.
        console.log('onSpeechError: ', e);
        this.setState({ error: JSON.stringify(e.error)});
    };
    
    onSpeechResults = (e) => {
        //Invoked when SpeechRecognizer is finished recognizing
       // console.log('onSpeechResults: ', e);
        this.setState({results: e.value});
        let spoken  = 0;
        for (i = 0; i<e.value.length; i++) {
          spoken = e.value[i].toLowerCase();
          if(spoken.includes('story')){
            this.state.story.map((result) => {
              Tts.speak(result);
            });
            break;
          }
          if(spoken.includes('wonderland')){
            TrackPlayer.setupPlayer().then(async () => {
              // Adds a track to the queue
              await TrackPlayer.add({
                id: '1',
                url: 'file:///storage/emulated/0/Audio-Story/AlicesAdventuresinWonderland/1.mp3',
                title: 'Alice in Wonderland, Chapter 1: Down the Rabbit-Hole',
                artist: 'Lewis Carroll',
              });
           
              // Starts playing it
              TrackPlayer.play();
           
          });
            break;
          }
          if(spoken.includes('chapter 3')){
            TrackPlayer.setupPlayer().then(async () => {
              // Adds a track to the queue
              await TrackPlayer.add({
                id: '3',
                url: 'file:///storage/emulated/0/Audio-Story/AlicesAdventuresinWonderland/3.mp3',
                title: 'Alice in Wonderland, Chapter 1: Down the Rabbit-Hole',
                artist: 'Lewis Carroll',
              });
           
              // Starts playing it
              TrackPlayer.play();
           
          });
            break;
          }
          if(spoken.includes('snow white')){
            Tts.speak(story);
            break;
          }
          if(spoken.includes('hello')){
            Tts.speak("Hi, Danniel. There are no story being told, And I have 3 story for you.");
            break;
          }
          if(spoken.includes('stop')){
            TrackPlayer.stop();
            Tts.stop();
            break;
          }
          if(spoken.includes('pause')){
            TrackPlayer.pause();
            break;
          }
          if(spoken.includes('resume')){
            TrackPlayer.play();
            break;
          }
        }
      this.setState({stopped: true});
    };
    
    onSpeechPartialResults = (e) => {
        //Invoked when any results are computed
      //  console.log('onSpeechPartialResults: ', e);
        this.setState({partialResults: e.value});
    };
    
    onSpeechVolumeChanged = async (e) => {
        //Invoked when pitch that is recognized changed
        //console.log('onSpeechVolumeChanged: ', e);
        this.setState({pitch: e.value});
        
    };

    _onHandlerStateChange = event => {
        if (event.nativeEvent.state === State.ACTIVE) {
            Vibration.vibrate();
            TrackPlayer.pause();
            Tts.stop();
            this.startRecognizing();
            this.setState({stopped: false});
        }

    };

  startRecognizing = async () => {
    try {
        await Voice.start('en-US');
        this.setState({pitch: ''});
        this.setState({error: ''});
        this.setState({started: ''});
        this.setState({result: []});
        this.setState({partialResults: []});
        this.setState({end: ''});
      } catch (e) {
        //eslint-disable-next-line
        console.error(e);
      }
  }

  render() {
    return (
      <LongPressGestureHandler
        onHandlerStateChange={this._onHandlerStateChange}
        minDurationMs={100}>
            <View style={styles.box}>
                <Image source={require('./mic.png')} style={styles.img}  />
                {this.state.results.map((result, index) => {return (
                  <Text style={{size: 20}}>{result}</Text>
                )}
                )}
            </View>
      </LongPressGestureHandler>
    );
  }
}

export default class Example extends Component {
  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <PressBox />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  box: {
    width: widthPhone,
    height: heightPhone-50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 200,
  },
  img: {
    width: 250,
    height: 250,
  }
});