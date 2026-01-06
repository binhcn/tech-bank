
### How to generate thread dump in Java application
- `kill -3 <pid>` -> generate a core dump in the logging of application
- `jstack <pid> | more`
- using VisualVM tool to capture thread dump:
  - right click in left sidevar
  - press ThreadDump button in Threads tab



### Garbage collection
- It was actually invented in 1959 with the Lisp programming language. However, Java made the concept of garbage collection more popular.
- The idea of garbage collection is that programmers ask for objects to be allocated on the heap, but they don't need to free them when they're finished with them.
- Instead, an automatic process will analyze the heap and it aims to work out which objects are no longer needed and any unneeded objects can be deleted, and the memory that they occupy can be freed up.
- JDK provides four options for garbage collectors:
  - Serial GC
  - Parallel GC
  - G1 GC
  - ZGC
- Any object on the heap which cannot be reached through a reference from the stack is eligible for garabge collection (use the term of unreachable instead of unreferenced)
- For completeness, static objects are referenced from the meta space. The references from the meta space will never be deleted. These objects will never be eligible for garbage collection
- gc() method is actually a suggestion to tell JVM to run a garbage collection process, but there's no guarantee that the JVM will actually do that

### ZGC
- is a scalable low-latency concurrent garbage collector capable of handling heaps ranging from 8MB to 16TB in size, with sub-milisecond max pause times


### Memory leak
- is defined that when one objest is not in use, the memory occupied by objects haven't been freed up and is still there.
- If you're running programs that have a memory leak, then over time, more and more of your computer's memory will get used up and eventually your computer will start to slow down and even crash


### How does Java application request heap memory for new object
- When you call the new keyword in Java to create a new object, you aren't actually taking memary from the operating system. The memory is acquired by the virtual machine.
- The virtual machine is actually just another program written in C, and this C program will control the request for memory objects from the operating system, and it controls the freeing up of memory when objects are no longer needed. So we can think of the virtual machine as deciding when to put in the call to the free function that C needs to release memory.

### Java is a managed language
- Memory leaks should be avoided in JVM because designers of the virtual machine have correctly ensured there are no leaks in the implementation
- Java avoids memory leaks is with the strategy of garbage collection

### What is the difference between the garbage collection algorithms in Java 8 & 11
- In Java 11, if the JVM has got lots of allocated memory that your application really don't need, the JVM will give some of it back to the OS when garbage collection runs
- The amount of memory that the JVM has taken from the OS to run your application:
  - if you're running Java 8 or below, it can never go down
  - But in Java 11, it can go down
- However, following the enhancement, everytime the JVM goes to the OS to request for memory, there will be a slight impact on performance.
- The way that we can get around is by using a flag -Xms300m to tell the JVM which initial heap size for your application. JVM  will never let the amount of memory you've reserved go below that initial heap size
![Java 8 GC](assets/java-8-gc.jpg)
![Java 11 GC](assets/java-11-gc.jpg)