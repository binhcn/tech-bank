

Virtual thread
- a feature of Java 21
- The thread where we use `Thread thread = new Thread(runnable)` is called platform thread. It is associated with OS thread basically. There is a problem with platform threads, as you increase the number of threads, the resources also need to be increased, which leads to OutOfMemory. So here virtual thread comes into the picture
  - A platform thread is implemented as a thin wrapper around on operating system (OS) thread. A platform thread runs Java code on its underlying OS thread, and the platform thread captures its OS thread for the platform thread's entire lifetime. Consequently, the number of available paltform threads is limited to the number of OS threads
  - Platform threads typically have a large thread stack and other resources that are maintained by the OS. They are suitable for running all types of tasks but may be a limited resource
- Virtual thread is not tied to only one OS thread
```
Thread thread = Thread.ofVirtual().unstarted(runnable);
thread.start()
thread.join() //wait for thread to be completed
```
