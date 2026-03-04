import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { InsertionSort, type Sort } from "./sort.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /* html */ `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

const implementedSorts: Sort[] = [new InsertionSort()];

const createShuffledList = (size: number): number[] => {
  const list: number[] = [0];
  for (let i = 0; i < size; i++) {
    list.push(Math.round(Math.random() * size));
  }
  return list;
};
const unsortedList = createShuffledList(100);

const runSort = (algo: Sort): number[] => {
  return algo.sort(unsortedList);
};

const sortedCorrectly = (listToCheck: number[]): boolean => {
  for (let i = 0; i < listToCheck.length - 1; i++) {
    if (listToCheck[i] > listToCheck[i+1]) {
      console.log(`Index: ${i} does not match: ${listToCheck[i]} > ${listToCheck[i+1]}`)
      return false;
    }
  }
  return true;
};

for (const algo of implementedSorts) {
  const sortedList = runSort(algo);
  if (!sortedCorrectly(sortedList)) {
    console.log(`${algo.constructor.name} sort faulty`);
  } else {
    console.log(`${algo.constructor.name} sort correct`);
  }
}