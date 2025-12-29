export type PigPosition = 'none' | 'dot' | 'no-dot' | 'trotter' | 'razorback' | 'snouter' | 'leaning-jowler';

export const POSITION_NAMES: Record<PigPosition, string> = {
  'none': 'None',
  'dot': 'Dot Up',
  'no-dot': 'No Dot',
  'trotter': 'Trotter',
  'razorback': 'Razorback',
  'snouter': 'Snouter',
  'leaning-jowler': 'Leaning Jowler',
};

export const SINGLE_POINTS: Record<PigPosition, number> = {
  'none': 0,
  'dot': 0,
  'no-dot': 0,
  'trotter': 5,
  'razorback': 5,
  'snouter': 10,
  'leaning-jowler': 15,
};

export const DOUBLE_POINTS: Record<PigPosition, number> = {
  'none': 0,
  'dot': 1,
  'no-dot': 1,
  'trotter': 20,
  'razorback': 20,
  'snouter': 40,
  'leaning-jowler': 60,
};

export type RollResult = {
  points: number;
  isPigOut: boolean;
  isOinker: boolean; // Not used in standard turn scoring button logic usually, but here for completeness
};

export function calculateScore(pos1: PigPosition, pos2: PigPosition): RollResult {
  if (pos1 === 'none' || pos2 === 'none') {
    return { points: 0, isPigOut: false, isOinker: false };
  }

  // Sider rules:
  // Both same side (dot or no-dot) = 1 pt
  // Different sides (one dot, one no-dot) = Pig Out (0 for turn)

  if (pos1 === pos2) {
    return { points: DOUBLE_POINTS[pos1], isPigOut: false, isOinker: false };
  }

  // Check for Pig Out (mixed siders)
  if ((pos1 === 'dot' && pos2 === 'no-dot') || (pos1 === 'no-dot' && pos2 === 'dot')) {
    return { points: 0, isPigOut: true, isOinker: false };
  }

  // Mixed positions: sum them up
  // Note: Siders (dot/no-dot) count as 0 if the other is a scorer
  const points = SINGLE_POINTS[pos1] + SINGLE_POINTS[pos2];

  return { points, isPigOut: false, isOinker: false };
}
