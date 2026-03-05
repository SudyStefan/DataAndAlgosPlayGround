def sort(list_to_sort: list[int]) -> tuple[list[int], int]:
    loopcount = 0
    for i in range(0, len(list_to_sort)):
        key = list_to_sort[i]
        j = i + 1
        while key > list_to_sort[j] and j < len(list_to_sort):
            j += 1
            loopcount += 1
        list_to_sort[j - 1] = key
        list_to_sort[i] = list_to_sort[j]

    return list_to_sort, loopcount
