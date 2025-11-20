1. If we change the List<Integer> below to Collection<Integer>, what is the difference of two outputs?
```
List<Integer> numbers = new ArrayList<>(List.of(1, 2, 3);
numbers.remove(1); //[1,3] -> remove element based on index

Collection<Integer> numbers = new ArrayList<>(List.of(1, 2, 3);
numbers.remove(1); //[2,3] -> removed element based on object
```

Abstract class
- is basically a base class which have some abstract methods and some defined methods.
- The actual implementation of abstract class will be done by the concrete classes which will have all the implementation
- It is meant to be inherited

Final class
- It means no class can inherit it


Sealed class
- If you want to restrict the subclasses for a particular class, you can make it sealed
```
sealed class A extends Thread permits B,C {}
non-sealed class B extends A {}
final class C extends A {}
class D extends B {}
```
