export interface User {
    id: string;
    name: string;
    email: string;
    stepCount: number;
}

export interface Challenge {
    id: string;
    title: string;
    participants: User[];
    totalSteps: number;
    startDate: Date;
    endDate: Date;
}

export interface LeaderboardEntry {
    user: User;
    steps: number;
}