export type Challenge = {
    run: ChallengePart[];
    day: number,
    title?: string
}

export type ChallengePart = {
    part: number;
    run: () => void;
}
