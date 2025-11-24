
Spring Retry
- exposes a library which contains automatic retry mechanism inside Spring framework
- it works on proxy-based approach or Spring AOP -> it will scan @Retryable, @Recovery annotations and create the proxy, which is a wrapper of the class containing these annotations
```
@Retryable(
  retryFor = RuntimeException.class,
  maxAttempts = 4,
  backoff = @Backoff(delay = 2000, multipler = 2.0)
)
public String callExternalApi() {}

@Recover
public String recover(RuntimeException e) {}
```
![Spring retry](assets/spring-retry.png)
![Spring retry pseudo](assets/spring-retry-pseudo.png)


Proxy in Spring
- There are a couple of types of proxies: CGLIB or JDK dynamic
