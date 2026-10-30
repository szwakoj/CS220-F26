# Circuits 4: Memory

The circuit that we were designing previously could be described as a basic calculator rather than a full computer. Results are calculated so long as an input number is given over the wires and is lost when the inputs are changed. In order for a full CPU to be created we not only need basic operations, but also a means of storing information for those operations to work on. This lesson will cover the basic circuits behind memory, as well as begin to explain the various levels of memory within a CPU. 


## Turing Tape Realized

Recall the Turing Machine yet again:

![A computational model of a Universal Turing Machine. It features a read/write head that is informed by a finite state machine. The head is pointing to an infinite tape of cells that can take on the value from a finite alphabet. The head is able to be moved left/right.](../img/Turing-machine.png)


So far the main circuits we have covered (gates, adders, MUXs, ALUs) would exist within the "finite state machine" in the above image. They represent the part of the Turing machine that understand and execute operations. However, the inputs, outputs, and the code for the operations all exist as information on the infinite tape 