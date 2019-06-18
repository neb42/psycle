import { get } from "http";

const rows = [
  {
    start: 1,
    end: 10,
    space: 6,
  },
  {
    start: 11,
    end: 21,
  },
  {
    start: 22,
    end: 32,
  },
];

const bikeRadius = 18;
const bikeGap = 10;

export const bikeCount = 32;

export const hasPillar = false;

export const getX = bikeNumber => {
  if (bikeNumber > bikeCount) {
    return getX(bikeCount);
  }

  const rowIdx = rows.findIndex(r => bikeNumber >= r.start && bikeNumber <= r.end);
  const columnIdx = bikeNumber - rows[rowIdx].start;
  const spacePosition = rows[rowIdx].space;

  const gapSum = columnIdx * bikeGap;
  const previousBikeSum = columnIdx * bikeRadius * 2;
  return gapSum + previousBikeSum + (spacePosition && bikeNumber >= spacePosition ? (bikeRadius * 2) + bikeGap  : 0);
};

export const getY = bikeNumber => {
  if (bikeNumber > bikeCount) {
    return getY(bikeCount);
  }

  const rowIdx = rows.findIndex(r => bikeNumber >= r.start && bikeNumber <= r.end);

  const gapSum = rowIdx * bikeGap;
  const previousBikeSum = bikeRadius * 2 * (rowIdx + 1);
  return gapSum + previousBikeSum;
};

export const getPillarX = () => {
  return getX(bikeCount);
};

export const getPillarY = () => {
  return getY(bikeCount);
};
