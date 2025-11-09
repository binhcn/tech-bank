What is Kafka?
- At a high level, it is an event streaming platform. It can be used either as message queue or a stream-processing system 


Difference between partition and topic

Partition:
- an ordered, immutable sequence of messages that we append to, like a queue, log file
- each broker can have multiple partitions

Topic:
- a logical grouping of partitions. Producers publish to and consumers consume messages from topics in Kafka
