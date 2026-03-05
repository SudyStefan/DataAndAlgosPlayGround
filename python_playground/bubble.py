def sort(list_to_sort: list[int]) -> tuple[list[int], int]:
  loopcount = 0
  sorted_count = 1
  while sorted_count != len(list_to_sort):
    for i in range(0, len(list_to_sort) - sorted_count):
      if list_to_sort[i] > list_to_sort[i+1]:
        temp = list_to_sort[i+1]
        list_to_sort[i+1] = list_to_sort[i]
        list_to_sort[i] = temp
      i += 1
      loopcount += 1
    sorted_count += 1
  
  return list_to_sort, loopcount