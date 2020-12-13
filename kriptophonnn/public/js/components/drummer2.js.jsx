var Drummer2 = React.createClass({
  getInitialState: function(){
    return {inputString: '', bpm: Math.floor(60000/TEMPO)};
  },

  componentDidMount: function (){
    initAudio('clavinet');
    this.changeButtonColors('clavinet');
  },

  handleChange: function(e) {
    this.state.inputString = e.target.value;
    this.setState({inputString:e.target.value});
    if(this.ready) {
      this.startQueue();
    }
  },

  ready: true,

  currentLength: 0,

  startQueue: function () {
    var that = this;
    this.ready = false;
    var current = 0;
    this.currentLength = this.state.inputString.length;
    this.state.inputString.toLowerCase().split('').forEach(function(letter, i) {
      setTimeout(function () {
        that.playAudio(letter,i);}, current);
      current += TEMPO;
    }.bind(this));
    if(this.state.inputString.length < 1) {
      this.ready = true;
    }
  },

  isPlaying: function (audelem) {
    return !audelem.paused;
  },

  rotateAudio: function (audios) {
    if(audios[0] === blankAudio) {
      return blankAudio;
    }
    for (var i = 0; i < audios.length; i++) {
      if(!this.isPlaying(audios[i])) {
        return audios[i];
      }
    }
  },

  playAudio: function (letter,i) {
    if(!AUDIOMAP[letter]) {
      letter = " ";
    }
    letter = letter.toLowerCase();
    this.currentIndex = i;
    this.rotateAudio(AUDIOMAP[letter]).play();
    var that = this;
    if(i >= this.currentLength - 1) {
      setTimeout(function () {
        that.startQueue();}, TEMPO);
    }
  },

  currentGenre: "clavinet",



  nextTempo: Math.floor(60000/TEMPO),

  bpmChange: function () {
    val = parseInt($("#temposlider").val());
    TEMPO = 250 + (val - 100) * -2 + (val - 100) * -2;
    this.setState({bpm: Math.floor(60000/TEMPO)});
  },

  render: function () {
    var that = this;
    return (
      <div className="container">

          <textarea id="text-box" type="text" value={this.state.inputString} onChange={this.handleChange} placeholder="Type here"></textarea>
        <div className="slider-container">
          <input id="temposlider" type="range" defaultValue="50" onChange={this.bpmChange}></input>
        </div>
        <div id="bpm">{this.state.bpm + " BPM"}</div>
      </div>
    )
  }

});
