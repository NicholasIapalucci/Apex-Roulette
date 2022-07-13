class Bangalore extends Legend {

    public readonly name: string = "Bangalore";

    public constructor() {
        super();
        this.addChallenge(new LegendChallenge("Poor Reaction", "If you get shot at, you can't sprint."));
    }
}