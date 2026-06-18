import {Candidate, RiskLevel, SessionStatus} from "@/types";

const FIRST_NAMES = [
    "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael",
    "Linda", "William", "Barbara", "David", "Susan", "Richard", "Jessica",
    "Joseph", "Sarah", "Thomas", "Karen", "Charles", "Lisa", "Ahmed", "Fatima",
    "Omar", "Layla", "Hassan", "Nour", "Yusuf", "Amira", "Khalid", "Hana",
    "Lucas", "Sofia", "Mateo", "Valentina", "Sebastian", "Isabella", "Liam",
    "Emma", "Noah", "Olivia", "Ethan", "Ava", "Mason", "Mia", "Logan",
];

const LAST_NAMES = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
    "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez",
    "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark",
    "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King",
    "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green",
];

const RISKS: RiskLevel[] = ["high", "medium", "low"];
const STATUSES: SessionStatus[] = [
    "active", "idle", "reconnecting", "terminated", "completed",
];

// Weights representing the probability of each status/risk being generated in the records
const STATUS_WEIGHTS = [45, 25, 10, 10, 10];
const RISK_WEIGHTS = [15, 35, 50];

function weightedRandom<T>(items: T[], weights: number[]): T {
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let i = 0; i < items.length; i++) {
        r -= weights[i];
        if (r <= 0) return items[i];
    }
    return items[items.length - 1];
}

function randomDate(hoursAgo: number): string {
    const d = new Date();
    d.setMinutes(d.getMinutes() - Math.floor(Math.random() * hoursAgo * 60));
    return d.toISOString();
}

export function generateMockCandidates(count: number = 10000): Candidate[] {
    return Array.from({length: count}, (_, i) => {
        const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
        const lastName = LAST_NAMES[Math.floor(i / FIRST_NAMES.length) % LAST_NAMES.length];
        const suffix = Math.floor(i / (FIRST_NAMES.length * LAST_NAMES.length));
        const name = suffix > 0 ? `${firstName} ${lastName} ${suffix}` : `${firstName} ${lastName}`;

        return {
            id: `candidate-${i + 1}`,
            name,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@exam.io`,
            riskLevel: weightedRandom(RISKS, RISK_WEIGHTS),
            status: weightedRandom(STATUSES, STATUS_WEIGHTS),
            lastActiveAt: randomDate(2),
            searchKey: `${name} ${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@exam.io`.toLowerCase(),
        };
    });
}
