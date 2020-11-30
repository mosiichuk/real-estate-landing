export default class Counter {
    constructor({startFromElementId, countersSelector, offset = 150}) {
        this.startFromElement = document.getElementById(startFromElementId);
        this.countersSelector = countersSelector;
        this.counterStarted = false;
        this.offset = offset;
    }

    onScroll = () => {
        if (this.startFromElement.getBoundingClientRect().top - this.offset > 0 || this.counterStarted)
            return;

        const counters = document.querySelectorAll(this.countersSelector);

        counters.forEach((element) => {
            this.createCounter(element, element.dataset.counter);
        });

        this.counterStarted = true;
    }

    createCounter(counterElement, limit) {
        let i = 0;

        let inv = setInterval(function () {
            if (i < limit)
                counterElement.innerHTML = ++i;
            else
                clearInterval(inv);
        }, 3000 / limit);
    }
}
