export interface User {
    id: string;
    name: string;
    email: string;
    stepCount: number;
}

export interface Challenge {
    id: string;
    name: string;
    startDate: string; // Or Date
    endDate: string; // Or Date
    participantIds: string[];
    // Add any other properties of a challenge here
}

export interface LeaderboardEntry {
    user: User;
    steps: number;
}