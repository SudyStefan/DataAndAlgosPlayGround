import random
import math
import time
import bubble
import selection
import insertion
import quicksort


def init_unosorted_list(n: int = 100) -> list[int]:
    list = [i for i in range(n)]
    random.shuffle(list)
    return list


list_length = 10000
print(f"n^2: {list_length**2}")
print(f"n: {list_length}")
print(f"n log(n): {list_length * math.log(list_length)}")
print(f"log(n): {math.log(list_length)}")

def run_bubble_sort(unsorted_list: list[int]):
    start_time = time.perf_counter()
    sorted_list = bubble.sort(unsorted_list)
    end_time = time.perf_counter()
    assert sorted_list == sorted(unsorted_list)
    print(f"\nbubble - time: {end_time - start_time:.4f}s")
    return end_time


def run_insertion_sort(unsorted_list: list[int]):
    start_time = time.perf_counter()
    sorted_list = insertion.sort(unsorted_list)
    end_time = time.perf_counter()
    assert sorted_list == sorted(unsorted_list)
    print(f"insertion - time: {end_time - start_time:.4f}s")
    return end_time


def run_selection_sort(unsorted_list: list[int]):
    start_time = time.perf_counter()
    sorted_list = selection.sort(unsorted_list)
    end_time = time.perf_counter()
    assert sorted_list == sorted(unsorted_list)
    print(f"selection - time: {end_time - start_time:.4f}s")
    return end_time

def run_quick_sort(unsorted_list: list[int]):
    start_time = time.perf_counter()
    sorted_list = quicksort.sort(unsorted_list)
    end_time = time.perf_counter()
    assert sorted_list == sorted(unsorted_list)
    print(f"quicksort - time: {end_time - start_time:.4f}s")
    return end_time

def test_chart_for_n():
    range_list = [10, 100, 500, 1000, 5000, 10000]
    unsorted_lists: list[list[int]] = [init_unosorted_list(n) for n in range_list]
    algo_runtimes: dict[str, list[float]] = {
        "bubble": [run_bubble_sort(unsorted_list) for unsorted_list in unsorted_lists],
        "insertion": [run_insertion_sort(unsorted_list) for unsorted_list in unsorted_lists],
        "selection": [run_selection_sort(unsorted_list) for unsorted_list in unsorted_lists],
        "quick": [run_quick_sort(unsorted_list) for unsorted_list in unsorted_lists],
    }
    for algo, times in algo_runtimes.items():
        print(f"{algo} - {[f"{range_list[i]} items: {times[i]:.4f}s" for i in range(0, len(range_list) - 1)]}")
