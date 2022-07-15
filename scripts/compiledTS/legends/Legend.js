import Bangalore from "./Bangalore.js";
export default class Legend {
    static ALL_LEGENDS = [];
    static BANGALORE = new Bangalore();
    challenges = [];
    constructor() {
        Legend.ALL_LEGENDS.push(this);
    }
    static withName(name) {
        return Legend.ALL_LEGENDS.filter(legend => legend.name === name)[0];
    }
    generateRandomChallenge() {
        return this.challenges[Math.floor(Math.random() * this.challenges.length)];
    }
    addChallenge(challenge) {
        challenge.legend = this;
        this.challenges.push(challenge);
    }
}
