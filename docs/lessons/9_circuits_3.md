# Circuits 3: Subtractor, Shifters, Comparators, and Decoders

Knowing that the ALU is more of a structural idea rather than a definite circuit diagram that must be memorized allows us to now go into circuits that will expand the capabilities of the ALU. This lesson will go though adding subtraction, bit shifting, and comparison circuits that could be used as operations in a larger ALU. 

## Adder/Subtractor Circuit

If we assume that the numbers within the computer will be 2's Complement (See Signed Number Lesson), we can change the ripple carry adder/ALU design to allow for us to do both adding and subtracting using the same circuit by utilizing signed number properties.

When subtracting two numbers, $S = B - A$,  we can reframe the expression into addition: $S = B + (-A)$ . Showing that subtraction is addition with the subtrahend (amount being subtracted) being negated. 

In 2's Complement, in order to negate a number we follow $-A = NOT(A) +1$. If we combine this with the previous fact, we can convert the expression:
-  $S = B - A$
-  $S = B + (-A)$
- $S = B + NOT(A) + 1$

This becomes trivial to implement now since we have an adder circuit and the NOT gate. The $+ 1$
 is not a problem either as the full adder circuit contains a C_in on the first adder, allowing us to add 1 from the start. 

To implement it using our previous full adder circuit, we need a method of primitively choosing between $A$ and $NOT(A)$ based on if we want normal addition or subtraction. This can be achieved by a MUX with the truth table:

| SUB | Out    |
| --- | ------ |
| 0   | A      |
| 1   | NOT(A) |
The selection signal, SUB, will be a status that is sent from the CU to indicate when subtraction will be output rather than addition. That status will also be fed as the initial C_in for the ripple adder chain. This gives the following diagram:

![](../img/adder_sub.png)

These can be chained like the ripple adder circuits and the ALU slices, making them easy to integrate into your understanding of an ALU:


## Shifters

The bit shift operation is an important one within a CPU. It can multiply, 




