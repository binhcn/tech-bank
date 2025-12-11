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


Future
- Java Future API was introduced in Java 5 and is a way to achieve asynchronous programming
- is used as a reference to the result of an asynchronous computation


Completable Future
- was introduced in Java 8 and is a way to achieve asynchronous programming
- Its main purpose is to handle the limitations of Future
- implements the Future and CompletionStage interfaces

Future limitations
- Futures cannot be completed manually
  - If the remote service is down, we cannot complete the Future manually using the latest cache version of data available
- futures cannot perform further action until the result is available
  - it doesn't notify us of its completion
  - it provides a get() method?which blocks until the result is available
- attaching a callback function is not possible
  - we don't have the ability to attach a callback function to the Future and have it called automatically when the Future's result is available
- multiple futures cannot be chained together
  - sometimes, we'll need to execute a long-running task and when that task is done, we need to send its result to another long-running task
- Multiple Futures cannot be combined together
  - Say that we have 10 different Futures that we want to run in parallel and then run some function after all of them completes
- There is no exception handling in the Future API



Asynchronous programming
- writing non-blocking code and running a task on a separate thread rather than the main application thread
- this way, the main thread won't have to wait for the completion of this async task and can execute other tasks in parallel