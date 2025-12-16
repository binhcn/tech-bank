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
- provides a huge set of methods for creating, chaining and combining multiple Futures. It also has a very comprehensive exception handling support
- No matter how many callbacks we attach on the same future, all these callbacks will be executed in the same thread. To execute our callbacks in a separate thread, we can use the async variant of these methods: thenApplyAsync(), thenAcceptAsync(), thenRunAsync()

```
var completableFuture = new CompletableFuture<String>();
completableFuture.getNow("GeekificNow"); // get with default value
completableFuture.complete("Geekific"); // subsequent calls will be ignored
completableFuture.get(); // get blocked forever if the future is not complete

CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {})
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> "result")
  .thenApply(result -> result + " abc")
  .thenAccept(result -> System.out.println(result))
  .exceptionally(exception -> {});
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> "result")
  .thenApply(result -> result + " abc")
  .thenRun(() -> System.out.println("xyz"))
  .handle((result, exception) -> {});

CompletableFuture<CompletableFuture<Double>> result = getBankAccount(accId).thenApply(account -> getAccountBalance(account));
equals to
CompletableFuture<Double> result = getBankAccount(accId).thenCompose(account -> getAccountBalance(account));

CompletableFuture<Double> combinedFuture = positiveFuture.thenCombine(
  negativeFuture, (positiveValue, negativeValue) -> positiveValue - negativeValue);
CompletableFuture<Void> combinedFuture = positiveFuture.thenAcceptBoth(
  negativeFuture, (positiveValue, negativeValue) -> positiveValue - negativeValue);
```


Methods of CompletableFuture
- the static methods runAsync() and supplyAsync() allow us to create a completableFuture instance out of the Runnable and Supplier functional interfaces
- thenApply() methods takes in a Function, so it will transform the result of the completableFuture when it arrives and will produce another result which can be further chained to multiple thenApply() methods
- thenAccept() method
  - is usually used as the last callback in callback chain as it do not return any result
  - it takes in a Consumer, so it will accept the result of the previous future and will return void
- thenRun() method
  - is usually used as the last callback in callback chain as it do not return any result
  - it doesn't even have access to that previous future result, it simply takes in a Runnable and will execute it when the previous future is completed
- thenCompose()
  - when thenApply() method returns a nested completableFuture, we can use thenCompose() to flaten the result, which makes the final result to be a top level Future
  - is used to combine two futures where one future is dependent on the other
- thenCombine() is used when you want two futures to run independently and do something after both are complete. The callback function passed to thenCombine() wil be called when both the futures are complete
- thenAcceptBoth() is used in case we want to do something with two dependent future results but don't need to pass any result value down a future chain
- CompletableFuture.allOf executes multiple futures in parallel, waits for all of them to finish, and then processes their combined results
- CompletableFuture.anyOf() returns a new completed future when any of the given futures completes
- exceptionally() callback
  - gives you a chance to recover from errors generated from the original future. You can log the exception here and return a default value
  - the error will not be propagated further in the callback chain if you handle it once
- handle() callback is a more generic method to recover from exceptions. It is called whether or not an exception occurs.




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