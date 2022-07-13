class Challenge {

    public static readonly ALL_CHALLENGES: Challenge[];

    public readonly name: string;
    public readonly description: string;   
    public readonly id; 

    public constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.id = Challenge.generateNextId();
        Challenge.ALL_CHALLENGES.push(this);
    }

    private static isPrime(n: number) {
        for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
        return true;
    }

    private static generateNextId() {
        let id = Challenge.ALL_CHALLENGES[Challenge.ALL_CHALLENGES.length - 1].id + 1;
        while (!Challenge.isPrime(id)) id++;
        return id;
    }

    public static withID(id: number): Challenge {
        for (let i = 0; i < Challenge.ALL_CHALLENGES.length; i++) {
            let challenge = Challenge.ALL_CHALLENGES[i];
            if (challenge.id === id) return challenge;
        }

        throw `Error: No challenge with ID ${id} exists`;
    }

    public static IDof(challenges: Challenge[]) {
        let prod = 1;
        challenges.forEach(challenge => prod *= challenge.id);
        return prod;
    }

    public static arrayWithID(num: number) {
        let challenges = [];
        Challenge.primeFactorsOf(num).forEach(factor => challenges.push(Challenge.withID(factor)));
        return challenges;
    }

    private static primeFactorsOf(n: number): number[] {
        let factors: number[] = [];
        while(n !== 1) {
            for (let i = 2; i < Math.sqrt(n); i++) {
                if (!Challenge.isPrime(i)) continue;
                if (n % i === 0) {
                    factors.push(i);
                    n /= i;
                }
            }
        }
        return factors;
    }
}
