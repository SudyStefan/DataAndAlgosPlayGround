import random
import math
import bubble
import selection
import insertion


def init_unosorted_list(n: int = 100) -> list[int]:
    list = [i for i in range(n)]
    random.shuffle(list)
    return list


list_length = 100
print(f"n^2: {list_length**2}")
print(f"n: {list_length}")
print(f"n log(n): {list_length * math.log(list_length)}")
print(f"log(n): {math.log(list_length)}")


def test_bubble_sort():
    list_to_sort = init_unosorted_list(list_length)
    sorted_list, loopcount = bubble.sort(list_to_sort)
    assert sorted_list == sorted(list_to_sort)
    print(f"loops: {loopcount}")


def test_insertion_sort():
    list_to_sort = init_unosorted_list(list_length)
    sorted_list, loopcount = insertion.sort(list_to_sort)
    assert sorted_list == sorted(list_to_sort)
    print(f"loops: {loopcount}")


def test_selection_sort():
    list_to_sort = init_unosorted_list(list_length)
    sorted_list, loopcount = selection.sort(list_to_sort)
    assert sorted_list == sorted(list_to_sort)
    print(f"loops: {loopcount}")
