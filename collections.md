 ![Collections classification](assets/collection-framework-hierarchy.png)

### List
- There are 8 different implementations of the list interface included with the core Java libraries
	- ArrayList
	- CopyOnWriteArrayList
	- LinkedList
	- AttributeList
	- RoleList
	- RoleUnresolvedList
	- Stack
	- Vector

### CopyOnWriteArrayList
- is a thread-safe verion of the ArrayList class but too costly
- If we call one of the methods which would change the list in any way, such as the add method, a copy of the list would be created and the original list would remain intact
- Consider using it when
	- Multiple threads accessing the same list
	- Lots of iterations/reads
	- Few writes/additions/deletions

### ArrayList
- it is implemented in memory as an array
- When you first instantiate an array list, the interal storage has been allocated on the heap for this object of 10 elements