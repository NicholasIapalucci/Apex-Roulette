import Bangalore from "./Bangalore.js";
import LegendChallenge from "../challenges/LegendChallenge.js";

export default abstract class Legend {
    
    public static readonly ALL_LEGENDS: Legend[] = [];

    public static readonly BANGALORE = new Bangalore();

    public readonly abstract name: string;
    public readonly challenges: LegendChallenge[] = [];

    public constructor() {
        Legend.ALL_LEGENDS.push(this);
    }

    public static withName(name: string) {
        return Legend.ALL_LEGENDS.filter(legend => legend.name === name)[0];
    }

    public generateRandomChallenge(): LegendChallenge {
        return this.challenges[Math.floor(Math.random() * this.challenges.length)];
    }

    protected addChallenge(challenge: LegendChallenge) {
        challenge.legend = this;
        this.challenges.push(challenge);
    }
}
