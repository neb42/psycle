const rows = [
  {
    start: 1,
    end: 11,
    inset: 2,
  },
  {
    start: 12,
    end: 23,
    inset: 1,
  },
  {
    start: 24,
    end: 33,
    inset: 2,
    hasPillar: true,
  },
  {
    start: 34,
    end: 46,
    inset: 0,
  },
  {
    start: 47,
    end: 56,
    inset: 3,
  },
];

const pillarPosition = 28;

const inset = 23;
const bikeRadius = 18;
const bikeGap = 10;
const pillarSize = 28;

export const bikeCount = 56;

export const hasPillar = true;

export const getX = bikeNumber => {
  if (bikeNumber > bikeCount) {
    return 0;
  }

  const rowIdx = rows.findIndex(r => bikeNumber >= r.start && bikeNumber <= r.end);
  const columnIdx = bikeNumber - rows[rowIdx].start;
  const rowIdxWithPillar = rows.findIndex(r => r.hasPillar);
  const afterPillar = rowIdx === rowIdxWithPillar && bikeNumber >= pillarPosition;

  const gapSum = columnIdx * bikeGap;
  const previousBikeSum = columnIdx * bikeRadius * 2;
  const pillarGap = (bikeGap * 2) + (bikeRadius * 3);
  return gapSum + previousBikeSum + (afterPillar ? pillarGap : 0) + (inset * rows[rowIdx].inset);
};

export const getY = bikeNumber => {
  if (bikeNumber > bikeCount) {
    return 0;
  }

  const rowIdx = rows.findIndex(r => bikeNumber >= r.start && bikeNumber <= r.end);

  const gapSum = rowIdx * bikeGap;
  const previousBikeSum = bikeRadius * 2 * (rowIdx + 1);
  return gapSum + previousBikeSum;
};

export const getPillarX = () => {
  const rowIdx = rows.findIndex(r => r.hasPillar);
  const columnIdx = pillarPosition - rows[rowIdx].start;

  const gapSum = columnIdx * bikeGap;
  const previousBikeSum = columnIdx * bikeRadius * 2;
  return gapSum + previousBikeSum + (inset * rows[rowIdx].inset);
};

export const getPillarY = () => {
  const rowIdx = rows.findIndex(r => r.hasPillar);

  const gapSum = rowIdx * bikeGap;
  const previousBikeSum = bikeRadius * 2 * (rowIdx + 1);
  return gapSum + previousBikeSum - (pillarSize / 2);
};
