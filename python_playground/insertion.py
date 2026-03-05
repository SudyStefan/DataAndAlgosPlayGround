def sort(list_to_sort: list[int]) -> tuple[list[int], int]:
    loopcount = 0
    for i in range(1, len(list_to_sort)):
        key = list_to_sort[i]
        j = i - 1
        while list_to_sort[j] > key and j >= 0:
            list_to_sort[j + 1] = list_to_sort[j]
            j -= 1
            loopcount += 1
        list_to_sort[j + 1] = key

    return list_to_sort, loopcount
