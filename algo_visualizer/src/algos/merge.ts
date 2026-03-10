import type SortAlgorithm from "./SortAlgorithm";
import { BigO } from "./SortAlgorithm";

export default class Merge implements SortAlgorithm {
  readonly name = "Merge Sort";
  readonly expectedBigO: BigO = BigO.N_LOG_N;
  readonly chartColor: string = "#10b981";

  private merge = (list: number[], low: number, mid: number, high: number): void => {
    const leftSize = mid - low + 1;
    const rightSize = high - mid;

    const leftArray = new Array(leftSize);
    const rightArray = new Array(rightSize);

    for (let i = 0; i < leftSize; i++) leftArray[i] = list[low + i];
    for (let j = 0; j < rightSize; j++) rightArray[j] = list[mid + 1 + j];

    let i = 0;
    let j = 0;
    let k = low;

    while (i < leftSize && j < rightSize) {
      if (leftArray[i] <= rightArray[j]) {
        list[k] = leftArray[i];
        i++;
      } else {
        list[k] = rightArray[j];
        j++;
      }
      k++;
    }
    while (i < leftSize) {
      list[k] = leftArray[i];
      i++;
      k++;
    }
    while (j < rightSize) {
      list[k] = rightArray[j];
      j++;
      k++;
    }
  };

  private mergeSortInternal = (list: number[], low: number, high: number): void => {
    if (low < high) {
      const mid = Math.floor(low + (high - low) / 2);
      this.mergeSortInternal(list, low, mid);
      this.mergeSortInternal(list, mid + 1, high);
      this.merge(list, low, mid, high);
    }
  };

  sort = (listToSort: number[]): number[] => {
    if (listToSort.length <= 1) return listToSort;
    this.mergeSortInternal(listToSort, 0, listToSort.length - 1);
    return listToSort;
  };
}
