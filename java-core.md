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
- is a feature of Java 17
- If you want to restrict the subclasses for a particular class, you can make it sealed
- The modifiers of sub-class of sealed class are sealed, non-sealed or final
- The modifiers of sub-interface of sealed interface are sealed or non-sealed
```
sealed class A extends Thread implements Clonable permits B,C {}
non-sealed class B extends A {} //sealed, non-sealed or final modifiers are expected
final class C extends A {}
class D extends B {}

sealed interface X permits Y {}
sealed interface Y extends X {} //sealed or non-sealed modifiers are expected
```

Record classes
- a feature in Java 17
- is created just to carry data, you can't change the value after initialization
- Record class is a shortcut of POJO class
- Creating a immutable Java object with full overriden methods (toString(), equals(), getter,...) is so verbose and cumbersome. Thus, we can simply create record class insteads.
- Record classes can implement interface, extend record but NOT extends other classes
```
record Alien (int id, String name) {
  static int num;
  public Alien {
    if (id == 0) throw new IllegalArgumentException("id cannot be zero");
  }
  public void show();
}
```
