import type SortAlgorithm from "./SortAlgorithm";
import { BigO } from "./SortAlgorithm";

export default class Quick implements SortAlgorithm {
  readonly name = "Quick Sort";
  readonly expectedBigO: BigO = BigO.N_LOG_N;
  readonly chartColor: string = "#3b82f6";

  private partition = (list: number[], low: number, high: number): number => {
    const pivot = list[Math.floor((low + high) / 2)];
    let i = low - 1;
    let j = high + 1;

    while (true) {
      do {
        i++;
      } while (list[i] < pivot);
      do {
        j--;
      } while (list[j] > pivot);
      if (i >= j) return j;

      const temp = list[i];
      list[i] = list[j];
      list[j] = temp;
    }
  };

  private quickSortInternal = (list: number[], low: number, high: number): void => {
    if (low < high) {
      const p = this.partition(list, low, high);
      this.quickSortInternal(list, low, p);
      this.quickSortInternal(list, p + 1, high);
    }
  };

  sort = (listToSort: number[]): number[] => {
    this.quickSortInternal(listToSort, 0, listToSort.length - 1);
    return listToSort;
  };
}
