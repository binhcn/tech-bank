

### Lombok
- is a Java library that reduces boilerphate code by generating common methods like getters, setters, constructors, builders, equals, hashCode and loggers at compile time
- lets you focus on business logic instead of repetitive Java code
- It includes annotations:
    - @NoArgsConstructor
    - @AllArgsContructor
    - @Slf4j
    - @Data
        - @Getter
        - @Setter
        - @EqualsAndHashCode
        - @ToString
        - @RequiredArgsConstructor
    - @Value: makes a class immutable
        - the class is final
        - its inner fields are private and final
    - @Builder

```
public final class ImmutableConfig {
    private final String url;

    public ImmutableConfig(String url) {
        this.url = url;
    }

    public String getUrl() {return url;}
}

-->

@Value
public class ImmutableConfig {
    String url;
}
```


Abstract Syntax Tree - AST
- It is kind of a in-memory tree representation of your code which compiler actually uses to understand, analyze and convert your code to bytecode
- it is basically a part of Java compiler


Annotation Processor - JSR-269
- Java has added this particular stuff specifically for annotation processing or annotation mapping
- It can read your annotation and then generate or update another Java code inside compiler, so it can generate other classes or just modify existing classes