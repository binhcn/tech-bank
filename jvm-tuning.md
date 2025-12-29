
### How to generate thread dump in Java application
- `kill -3 <pid>` -> generate a core dump in the logging of application
- `jstack <pid> | more`
- using VisualVM tool to capture thread dump:
  - right click in left sidevar
  - press ThreadDump button in Threads tab



### Garbage collection
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