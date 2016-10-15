 x-webkit-speech
================


- [speech-input](https://github.com/Daniel-Hug/speech-input)

see also:

- [The HTML5 Speech Recognition API](http://shapeshed.com/html5-speech-recognition-api/)

Deprecated
----------

- [x-webkit-speech is deprectated](http://stackoverflow.com/questions/23188951/x-webkit-speech-is-deprectated-a-js-replacement-for-simple-speech-input-for-in)
- [Disabling Chrome’s x-webkit-speech vulnerability](https://blogs.janestreet.com/disabling-chromes-x-webkit-speech-vulnerability/)
- [Accepting Speech Input in HTML5 Forms](http://blog.teamtreehouse.com/accepting-speech-input-html5-forms)

```
<input type="text" x-webkit-speech />
<input type="text" x-webkit-speech="x-webkit-speech" />

if (document.createElement("input").webkitSpeech === undefined) {
	alert("Speech input is not supported in your browser.");
}

```

see:

- [How to Use HTML5 Speech Input Fields](http://www.sitepoint.com/html5-speech-input-fields/)
- [webkit Speech Input test](http://blogs.sitepointstatic.com/examples/tech/speech-input/index.html)
- [Web Speech Synthesis Demo](http://codepen.io/matt-west/pen/wGzuJ)
- [How to Add Speech Recognition to your Website](http://www.labnol.org/software/add-speech-recognition-to-website/19989/)
