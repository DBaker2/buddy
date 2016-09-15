/**
 * Buddy Speaks!
 */

var languageOptions = {
  'lang': 'en-GB',
  'rate': 0.5,
  'pitch': 2.0,
}

console.log('started from the bottom')

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
var final_transcript = '';
recognition.onstart = (event) => {
  final_transcript = '';
  console.log(event)
};
recognition.onerror = (event) => {
  console.log(event);
  if (event.error === 'not-allowed') chrome.tabs.create({ url: 'chrome-extension://nlmecbnnkdbojaccnamoapiiccgmhkic/getSpeech.html'});
};
recognition.onend = (event) => {
  console.log(event);
  speak(final_transcript);
  recognition.start();

};

recognition.onresult = (event) => {
  var interim_transcript = '';

  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
    } else {
      interim_transcript += event.results[i][0].transcript;
    }
  }
  // final_span.innerHTML = linebreak(final_transcript);
  // interim_span.innerHTML = linebreak(interim_transcript);
  console.log(interim_transcript, final_transcript)
};

recognition.start();

function speak(words) {
  console.log(recognition)
  console.log(words);
  chrome.tts.speak(words, {
    'rate': 0.8,
    'pitch': 1.2,
    // 'voiceName': 'Google UK English Male',
  });


  // chrome.tts.getVoices(
  //         function(voices) {
  //           for (var i = 0; i < voices.length; i++) {
  //             // chrome.tts.speak(`Hey there. I am ${voices[i].voiceName}, but I like to think that I am more than that. I am a human being. With real feelings.`, {
  //             //   'rate': 1,
  //             //   'enqueue': true,
  //             //   'voiceName': voices[i].voiceName,
  //             // });

  //             console.log('Voice ' + i + ':');
  //             console.log('  name: ' + voices[i].voiceName);
  //             console.log('  lang: ' + voices[i].lang);
  //             console.log('  gender: ' + voices[i].gender);
  //             console.log('  extension id: ' + voices[i].extensionId);
  //             console.log('  event types: ' + voices[i].eventTypes);
  //           }
  //         });
}