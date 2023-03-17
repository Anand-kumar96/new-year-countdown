class CountDown {
    constructor(expiredDate, onRender, onComplete) {
        this.setExpiredDate(expiredDate);

        this.onRender = onRender;
        this.onComplete = onComplete;
    }

    setExpiredDate(expiredDate) {
        const currentTime = new Date().getTime(); // get the current time
        this.timeRemaining = expiredDate.getTime() - currentTime;// calculate the remaining time 

        this.timeRemaining > 0 ?
            this.start() :
            this.complete();
    }

    complete() {
        if (typeof this.onComplete === 'function') {
            onComplete();
        }
    }
    getTime() {
        return {
            days: Math.floor(this.timeRemaining / 1000 / 60 / 60 / 24),
            hours: Math.floor(this.timeRemaining / 1000 / 60 / 60) % 24,
            minutes: Math.floor(this.timeRemaining / 1000 / 60) % 60,
            seconds: Math.floor(this.timeRemaining / 1000) % 60
        };
    }

    update() {
        if (typeof this.onRender === 'function') {
            this.onRender(this.getTime());
        }
    }

    start() {
        this.update(); // update the countdown

        // setup a timer
        const intervalId = setInterval(() => {
            this.timeRemaining -= 1000;    // update the timer  
            if (this.timeRemaining < 0) {
                complete();// call the callback
                clearInterval(intervalId);// clear the interval if expired
            } else {
                this.update();
            }

        }, 1000);
    }
}