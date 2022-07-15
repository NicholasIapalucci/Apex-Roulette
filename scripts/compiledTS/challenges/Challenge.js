export default class Challenge {
    static ALL_CHALLENGES;
    name;
    description;
    id;
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.id = Challenge.generateNextId();
        Challenge.ALL_CHALLENGES.push(this);
    }
    static isPrime(n) {
        for (let i = 2; i <= Math.sqrt(n); i++)
            if (n % i === 0)
                return false;
        return true;
    }
    static generateNextId() {
        let id = Challenge.ALL_CHALLENGES[Challenge.ALL_CHALLENGES.length - 1].id + 1;
        while (!Challenge.isPrime(id))
            id++;
        return id;
    }
    static withID(id) {
        for (let i = 0; i < Challenge.ALL_CHALLENGES.length; i++) {
            let challenge = Challenge.ALL_CHALLENGES[i];
            if (challenge.id === id)
                return challenge;
        }
        throw `Error: No challenge with ID ${id} exists`;
    }
    static IDof(challenges) {
        let prod = 1;
        challenges.forEach(challenge => prod *= challenge.id);
        return prod;
    }
    static arrayWithID(num) {
        let challenges = [];
        Challenge.primeFactorsOf(num).forEach(factor => challenges.push(Challenge.withID(factor)));
        return challenges;
    }
    static primeFactorsOf(n) {
        let factors = [];
        while (n !== 1) {
            for (let i = 2; i < Math.sqrt(n); i++) {
                if (!Challenge.isPrime(i))
                    continue;
                if (n % i === 0) {
                    factors.push(i);
                    n /= i;
                }
            }
        }
        return factors;
    }
}
