
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

### ZGC
- is a scalable low-latency concurrent garbage collector capable of handling heaps ranging from 8MB to 16TB in size, with sub-milisecond max pause times


### Memory leak
- is defined that when one objest is not in use, the memory occupied by objects haven't been freed up and is still there.
- If you're running programs that have a memory leak, then over time, more and more of your computer's memory will get used up and eventually your computer will start to slow down and even crash


### How does Java application request heap memory for new object
- When you call the new keyword in Java to create a new object, you aren't actually taking memary from the operating system. The memory is acquired by the virtual machine.
- The virtual machine is actually just another program written in C, and this C program will control the request for memory objects from the operating system, and it controls the freeing up of memory when objects are no longer needed. So we can think of the virtual machine as deciding when to put in the call to the free function that C needs to release memory.