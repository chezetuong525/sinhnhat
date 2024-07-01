function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  
  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
  
    function updateClock() {
      var t = getTimeRemaining(endtime);
  
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
        document.getElementById('fireworks').style.display = 'block';
        document.getElementById('message').style.display = 'block';
        document.getElementById('question').style.display = 'block';
  
        var container = document.getElementById('fireworks');
        var fireworks = new Fireworks(container, {
          speed: 2,
          acceleration: 1.05,
          friction: 0.95,
          gravity: 1.5,
          particles: 100,
          trace: 3,
          explosion: 5,
          boundaries: {
            top: 50,
            bottom: container.clientHeight,
            left: 50,
            right: container.clientWidth
          },
          sound: {
            enable: true,
            list: ['explosion0.mp3', 'explosion1.mp3', 'explosion2.mp3'],
            min: 4,
            max: 8
          }
        });
  
        // Bắt đầu bắn pháo hoa mãi mãi
        setInterval(() => fireworks.fire(), 500);
      }
    }
  
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }
  
  function createHearts() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    document.body.appendChild(heart);
  
    setTimeout(() => {
      heart.remove();
    }, 5000);
  }
  
  // Tạo trái tim mãi mãi
  setInterval(createHearts, 300);
  
  var deadline = new Date(Date.parse('2024-07-08T00:00:00'));
  initializeClock('clockdiv', deadline);
  
  document.getElementById('no').addEventListener('mouseover', function() {
    var x = Math.random() * (window.innerWidth - this.offsetWidth);
    var y = Math.random() * (window.innerHeight - this.offsetHeight);
    this.style.position = 'absolute';
    this.style.left = x + 'px';
    this.style.top = y + 'px';
  });