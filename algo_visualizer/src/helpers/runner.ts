import type { Dispatch, SetStateAction } from "react";
import type SortAlgorithm from "../algos/SortAlgorithm";

export type BenchmarkDataPoint = { n: number; [algoName: string]: number };
export type VisulizationData = { algoName: string; listToSort: number[] };

const getMedian = (values: number[]): number => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
};

const generateIntervals = (maxSize: number, intervals: number): number[] => {
  if (intervals <= 0) return [];
  if (intervals === 1) return [maxSize];

  // We map 'i' from [1...intervals] to a squared scale
  // This creates a distribution that is denser at the start
  // but spreads out meaningfully toward the max.
  const points = Array.from({ length: intervals }, (_, i) => {
    const fraction = (i + 1) / intervals;
    // Using a power of 2 (or 1.5 for a softer curve)
    const scaledFraction = Math.pow(fraction, 2);
    const value = Math.round(scaledFraction * maxSize);

    // Ensure we don't return 0
    return Math.max(value, 10);
  });

  // Remove duplicates (important for small maxSize/high intervals)
  return Array.from(new Set(points)).sort((a, b) => a - b);
};

export const runBenchmarks = async (
  selectedAlgos: SortAlgorithm[],
  maxSize: number,
  intervals: number,
  onResult: (dataPoint: BenchmarkDataPoint) => void
) => {
  const sizes = generateIntervals(maxSize, intervals);
  const iterations = 3;

  for (const n of sizes) {
    const dataPoint: BenchmarkDataPoint = { n };
    const baseArray = Array.from({ length: n }, () =>
      Math.floor(Math.random() * 10000)
    );

    for (const algo of selectedAlgos) {
      // warm up
      algo.sort([...baseArray]);

      const times: number[] = [];
      for (let i = 0; i < iterations; i++) {
        const arrayCopy = [...baseArray];
        const start = performance.now();
        algo.sort(arrayCopy);
        const end = performance.now();
        times.push(end - start);
      }
      dataPoint[algo.name] = parseFloat(getMedian(times).toFixed(4));
    }
    onResult(dataPoint);
    await new Promise((r) => setTimeout(r, 0));
  }
};

export const runVisulization = async (
  selectedAlgos: SortAlgorithm[],
  updateListToSort: Dispatch<SetStateAction<VisulizationData[]>>
) => {};
