![MVC 3 layer architecture](assets/three-layer-architecture.png)



JDBC
- JAVA database connection:
  - Load the JDBC Driver
  - Establish a connection
  - Create a SQL query
  - Prepare the statement
  - Set Parameters
  - Execute the Query

ORM
- Object relational mapping
- it's mapping between your object and relational database
  - an object/entity/model is a table in a database
  - a field in object is a column in the table
- The famous framework for ORM is Hibernate, EclipseLink, OpenJPA,...

JPA
- Java Persistance API
- JPA is basically specification provided by Java in order to manage relational data inside your application
- It contains standardized APIs which work with many different providers, for example, it is kind of abstraction layer on top of Hibernate

Why do we need JPA rather than Hibernate? Why not to use Hibernate directly?
- JPA is basically specification while Hibernate is one of the implementation of JPA
- No one stops you directly to use only Hibernate. But in case if you need to migrate away from Hibernate, you will need to do a lot of changes inside your application


Spring Data JPA
- is basically framework provided by Spring framework in order to do database connections
- It simplifies CRUD operations by providing interfaces like CrudRepository, JpaRepository, PagingAndSortingRepository,...

![Spring Data JPA](assets/spring-data-jpa.png)


- Entity is a object which will be mapped to table inside your relational database
- Entity manager is an interface which is responsible for managing entities. It will perform the operations on entity, for example save(), persist(), remove(), find(),...
- Persistance Context is a cache where managed entities will be temporarily stored. Entity Manager interacts with Persistance Context to retrieve entities
```
EntityManager em = entityManagerFactory.createEntityManager();
em.persist(book);
```
![JPA Architecture](assets/jpa-architecture.png)


- Entity Manager does not manage newly-created entity, which is in transient state
- When Entity Manager do persist() with transient entity, the bean will be added inside the Persistance Context. It is in Managed state
- If you make any changes to managed entity, it will be automatically synchronized with database
- Entity is in detached state, which means it is once in persistance context, but now it is no longer managed by Entity Manager
- Entity is in removed state, which means it is marked for deletion but it is still inside the Persistance Context
![Entity Lifecycle](assets/entity-lifecycle.png)

References:
- [Introduction to Spring Data JPA | What is JPA? Benefits & Use Cases](https://www.youtube.com/watch?v=hL_MplPZkhQ)
- [JPA Architecture & Entity Lifecycle Explained | Spring Data JPA Deep Dive](https://www.youtube.com/watch?v=vypAqz4MEus)
