var Counter = React.createClass({
  render: function () {  
    return (
      <div className='panel'>
        <a onClick={this.props.handleChange} className='btn btn-default'>-</a>
        <p>{this.props.count}</p>
        <a onClick={this.props.handleChange} className='btn btn-default'>+</a>
      </div>
    )
  }
});

var App = React.createClass({
  getInitialState: function () {  
    console.log('getInitialState');
    return {       
      breakCount: 5,
      key: 'Start',
      minutes: 0,
      seconds: 0,
      secondsElapsed: 0,
      timeElapsed: 1500,
      timerStart: false,
      workCount: 25      
    }
  },
  tick: function() {
    console.log('tick');
    var timeElapsed = this.state.timeElapsed - 1,
        minutes = Math.floor(timeElapsed / 60),
        seconds = minutes ? timeElapsed - (minutes * 60) : timeElapsed;
         
    if (this.state.timerStart) {
      this.setState({
        minutes: minutes,
        seconds: seconds,
        secondsElapsed: this.state.secondsElapsed + 1,
        timeElapsed: timeElapsed
      });
    }
  },
  componentDidMount: function() {
    console.log('componentDidMount');
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    console.log('componentWillUnmount');
    clearInterval(this.interval);
  },
  breakChange: function (e) {  
    var text = e.target.text,
        count = this.state.breakCount;
    console.log(e.target.text);
    var newCount = text === '+' ? count + 1 : count - 1;
    this.setState({
      breakCount: newCount,
      timeElapsed: newCount * 60,
      timerStart: false
    });
  },
  workChange: function (e) {  
    var text = e.target.text,
        count = this.state.workCount;
    console.log(e.target.text);
    var newCount = text === '+' ? count + 1 : count - 1;
    this.setState({
      workCount: newCount,
      timeElapsed: newCount * 60,
      timerStart: false
    });
  },
  onStart: function () {  
    if (this.state.timerStart) {
      this.setState({
        timerStart: false,
        key: 'Start'
      });
    } else {
      this.setState({
        timerStart: true,
        key: 'Stop'
      });
    }
  },
  render: function () {  
    console.log(this.state);
    return (
      <div>
        <Counter handleChange={this.breakChange} count={this.state.breakCount} />
        <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
        <div>Time Elapsed: {this.state.timeElapsed}</div>
        <div><h3>{this.state.minutes} : {this.state.seconds}</h3></div>
        <div>Time Start: {this.state.timeStart}</div>
        <a onClick={this.onStart} className='btn btn-default'>{this.state.key}</a>
        <Counter handleChange={this.workChange} count={this.state.workCount} />
        <p>Break period: {this.state.breakCount}</p>
        <br />
        <p>Work period: {this.state.workCount}</p>
      </div>
    )
  }
});

ReactDOM.render(
  <App start={Date.now()} />, 
  document.getElementById('app')
);