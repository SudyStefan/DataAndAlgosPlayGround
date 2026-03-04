export interface Sort {
  sort(unsortedList: number[]): number[]; 
}

export class InsertionSort implements Sort {
  sort = (unsortedList: number[]): number[] => {
    const A = structuredClone(unsortedList);
    for (let i = 1; i < A.length; i++) {
      let key = A[i];
      let j = i - 1;
      while (A[j] > key && j > 0 ) {
        A[j+1] = A[j];
        j--;
      }
      A[j+1] = key;
    }
    return A;
  }
}

export class BubbleSort implements Sort {
  sort = (unsortedList: number[]): number[] => {
    return [];
  }
}

export class QuickSort implements Sort {
  sort = (unsortedList: number[]): number[] => {
    return [];
  }
}

export class RadixSort implements Sort {
  sort = (unsortedList: number[]): number[] => {
    return [];
  }
}
