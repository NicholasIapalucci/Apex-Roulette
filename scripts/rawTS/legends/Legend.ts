abstract class Legend {
    
    public static readonly ALL_LEGENDS: Legend[] = [];

    public readonly abstract name: string;
    public readonly challenges: LegendChallenge[] = [];

    public constructor() {
        Legend.ALL_LEGENDS.push(this);
    }

    public generateRandomChallenge(): LegendChallenge {
        return this.challenges[Math.floor(Math.random() * this.challenges.length)];
    }

    protected addChallenge(challenge: LegendChallenge) {
        challenge.legend = this;
        this.challenges.push(challenge);
    }
}
