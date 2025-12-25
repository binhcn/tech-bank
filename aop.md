


### AOP - Aspect Oriented Programming
- is one of key components of Spring. AOP complements Spring IoC to provide a very capable middleware solution
- AOP complements OOP by providing another way of thinking about program structure
    - The key unit of modularity in OOP is the class, whereas in AOP is the aspect
- Aspect enables the modularization of concerns that cut across multiple classes.
    - The cross-cutting conerns can be transaction management, logging,... but not business logic 
    - Aspect enables the separation of cross-cutting conerns from your actual methods, from your actual business logic

### Terminology
- Aspect
    - In AOP, aspects are implemented by using regular classes (schema-based approach) or regular classes annotated with the @Aspect annotation (@AspectJ style)
    - it modularizes a concern that cuts across multiple classes - crossing-cutting concern
- Join point
    - a point during the execution of a program, such as the execution of a method or the handling of an exception.
    - in AOP, a join point always represents a method execution
- Advice
    - an action taken by an aspect at a particular join point.
    - Different types of advice include around, before and after advice
- Pointcut
    - a predicate that matches join points. Advice is associated with a pointcut expression and runs at any join point matched by the pointcut.
    - spring uses AspectJ pointcut expression language by default


### Illustration of aspect
```
@After("execution(* com.nab.au.service.ProductService.addProduct(..))")
@Around("execution(* com.nab.au.service.ProductService.*(..))")
@Before("execution(* com.nab.au.service.*.*(..))")
@AfterReturning("execution(* com.nab.au.service.*.*(..))") // it runs when a matched method execution returns normally
@AfterThrowing("execution(* com.nab.au.service.*.*(..))") // it runs when a matched method execution exits by throwing an exception

// Declaring a pointcut and supported pointcut designators
@Pointcut("execution(* com.nab.au.service.ProductService.*(..))")
@Pointcut("within(com.nab.au.service.ProductService)") //All the methods in ProductService are intercepted by the pointcut expression
@Pointcut("@within(org.springframework.sterotype.Service)") //All the methods of a class annotated with @Service are intercepted by the pointcut expression
@Pointcut("@annotation(org.springframework.web.bind.annotation.PostMapping)") //All the methods annotated with @PostMapping are intercepted by the pointcut expression
@Pointcut("within(com.nab.au.service.ProductService) && @within(org.springframework.sterotype.Service)")
@Pointcut("articleListPointcut() && articleListPointcut2())")
private void articleListPointcut() {} // named pointcut

@Around("articleListPointcut()")
public Object aroundAdvice(ProceedingJoinPoint pjp) {
    Object articles = cache.get(pjp.getArgs());
    if (articles == null) {
        articles = pjp.proceed(pjp.getArgs());
    }
    return articles;
}
// In the above example, we illustrate one of the most popular usages of @Around advice.
//The actual method gets invoked only if the cache doesn’t return a result.
//It’s the exact way the Spring Cache Annotations work.
```

### AOP proxies
- Spring AOP is a mechanism based on proxies
- There are two types of AOP proxies:
    - JDK dynamic proxies enable any interface or set of interfaces to be proxied, including the class implementing interface
    - CGLIB proxies are necessary to proxy classes which do not implement an interface


Question:
- Need to clear about PCDs: within and target, this and target, @args