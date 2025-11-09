What is Kafka?
- At a high level, it is an event streaming platform. It can be used either as message queue or a stream-processing system

---

Difference between partition and topic

Partition:
- an ordered, immutable sequence of messages that we append to
- partitions are actually the separate log files that exist on disk

Topic:
- a logical grouping of partitions
- the process of publishing and consuming messages based on topic definition
