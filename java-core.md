1. If we change the List<Integer> below to Collection<Integer>, what is the difference of two outputs?
```
List<Integer> numbers = new ArrayList<>(List.of(1, 2, 3);
numbers.remove(1);
System.out.println(numbers); //[1,3] -> remove element based on index
```
Result: [2,3] -> removed element based on object

