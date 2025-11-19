

Virtual thread
- a feature of Java 21
- The thread where we use `Thread thread = new Thread(runnable)` is called platform thread. It is associated with OS thread basically. There is a problem with platform threads, as you increase the number of threads, the resources also need to be increased, which leads to OutOfMemory. So here virtual thread comes into the picture
```
Thread thread = Thread.ofVirtual().unstarted(runnable);
thread.start()
thread.join() //wait for thread to be completed
```
