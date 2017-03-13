document.addEventListener('DOMContentLoaded', function() {
    var startTimerButton = document.getElementById('startTimer');
    var timeDisplay = document.getElementById('timeDisplay');

    startTimerButton.addEventListener('click', function() {
        chrome.alarms.create('timer',  Date.now())
    });

    function Timer(mins, target, cb) {
        this.counter = mins * 60;
        this.target = target;
        this.callback = cb;
    }

    Timer.prototype.pad = function(s) {
        return (s < 10) ? '0' + s : s;
    };

    Timer.prototype.start = function(s) {
        this.count();
    };

    Timer.prototype.stop = function(s) {
        this.count();
    };

    Timer.prototype.done = function(s) {
        if (this.callback) this.callback();
    };

    Timer.prototype.display = function(s) {
        this.target.innerHTML = this.pad(s);
    };

    Timer.prototype.count = function(s) {
        var self = this;
        self.display.call(self, self.counter);
        self.counter--;
        var clock = setInterval(function() {
            self.display(self.counter);
            self.counter--;
            if (self.counter < 0) {
                clearInterval(clock);
                self.done.call(self);
            }
        }, 1000);
    };

}, false);