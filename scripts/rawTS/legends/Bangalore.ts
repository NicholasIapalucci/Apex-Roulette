import Legend from "./Legend.js";
import LegendChallenge from "../challenges/LegendChallenge.js";

export default class Bangalore extends Legend {

    public readonly name: string = "bangalore";

    public constructor() {
        super();
        this.addChallenge(new LegendChallenge("Poor Reaction", "If you get shot at, you can't sprint."));
    }
}
