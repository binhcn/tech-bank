

### Strangler Fig pattern
- is an incremental migraion strategy for replacing legacy system. Named after a strangler fig trees that slowly envelop and replace their host trees, it allows you to gradually migrate from an old system to a new one without a risky "big bang" rewrite
- it builds a facade or proxy to route traffic to legacy or new system
- Benefits:
  - Low risk - no big-bang cutover, rollback is easy
  - incremental value - delivers improvements continuously
  - parallel running - both system coexist during migration
  - learn as you go - adjust strategy based on what you learn
- When to use
  - Replacing monoliths with microservices
  - Migrating from legacy tech stacks
  - Modernizing databases or APIs
  - Any situation where a full rewrite is too risky


### Learn as you go
- is an iterative approach where you acquire knowledge and adjust your strategy incrementally during a project, rather than trying to understand everything upfront
```
Traditional Approach
[Big Upfront Design] -> [Build Everything] -> [Deploy]
X High risk: assumptions may be wrong

Learn As You Go
[Build] -> [Learn] -> [Adjust] -> [Build] -> [Learn] -> [Adjust]
V Continous feedback, reduced risk
```

### Modernizing databases or APIs
- Modernization means upgrading legacy databases or APIs to newer technologies, architectures or patterns to improve performance, maintainability, scalability and developer experience