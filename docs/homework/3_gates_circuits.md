# Homework 3: 4-Bit ALU Circuit Diagram

## Due Date: 10/31/26

## Description

In this assignment, you will be designing a functional **4-bit Arithmetic Logic Unit (ALU)**. You will design this circuit by hand (neatly drawn on paper). Your task is to construct every functional block down to fundamental logic gates, no black-box adders or high-level multiplexer macros are allowed.
## Technical Specifications

Your 4-bit ALU must accept two 4-bit input operands and perform four core arithmetic and bitwise operations based on a 2-bit operation selection signal.

### Inputs

- Operand A: 4-bit bus ($A_3, A_2, A_1, A_0$)
- Operand B: 4-bit bus ($B_3, B_2, B_1, B_0$)
- Carry-In ($C_{in}$): 1-bit input signal (for arithmetic addition)
- Operation Select ($S_1, S_0$): 2-bit control signal

### Outputs

- Result Output ($Y$): 4-bit bus ($Y_3, Y_2, Y_1, Y_0$)
- Carry-Out ($C_{out}$): 1-bit signal indicating carry-out from the most significant bit ($MSB$)
- Overflow Flag ($V$): 1-bit signal indicating signed two's complement overflow

### Operation Control Table

| $S_1$ | $S_0$ | Operation | Output ($Y$) | Notes |
| --- | --- | --- | --- | --- |
| **0** | **0** | **ADD** | $A + B + C_{in}$ | Unsigned 4-bit addition with Carry-Out |
| **0** | **1** | **AND** | $A \text{ AND } B$ | Bitwise logical AND |
| **1** | **0** | **OR** | $A \text{ OR } B$ | Bitwise logical OR |
| **1** | **1** | **XOR** | $A \text{ XOR } B$ | Bitwise logical XOR |

---

## Requirements

1. **Primitive Gates Only:** Every component—including full adders and multiplexers—must be fully drawn out using basic logic gates (AND, OR, NOT, XOR, NAND, NOR).
2. **Modular Bit-Slice Design:** To keep your diagram readable and structured, you must first design a **1-Bit ALU Slice**, then cascade four instances of this slice together to form the complete 4-bit unit.
3. **Parallel Execution:** The ALU must generate all four potential candidate outputs ($ADD$, $AND$, $OR$, $XOR$) simultaneously for each bit-slice. The selection control signal ($S_1, S_0$) then routes the desired candidate to the output using a multiplexer.

---

## Assignment Tasks

### Part 1: Sub-Block Gate Schematics (30 Points)

Before wiring the full system, construct the basic functional building blocks using fundamental logic gates.

#### Task 1a: Full Adder Sub-Circuit (20 Points)

Draw the complete logic schematic for a single 1-bit Full Adder.

- Inputs: $A_i$, $B_i$, $C_i$
- Outputs: $Sum_i$, $C_{i+1}$
* Must be constructed strictly using basic logic gates (XOR, AND, OR).

#### Task 1b: 4-to-1 Multiplexer Sub-Circuit (20 Points)

Draw the complete gate-level schematic for a 1-bit 4-to-1 Multiplexer.

- Inputs: Four data lines ($I_0, I_1, I_2, I_3$), two control select lines ($S_1, S_0$)
- Output: Single bit line $Out$
* Must use NOT gates for decoding select lines, AND gates for input enabling, and an OR gate to merge outputs.


### Part 2: 1-Bit ALU Slice Diagram (30 Points)

Combine your sub-circuits into a unified 1-Bit ALU Bit-Slice schematic.

* Connect input bits $A_i$ and $B_i$ to four parallel functional paths:
	1. Full Adder logic (Arithmetic)
	2. AND gate logic (Bitwise)
	3. OR gate logic (Bitwise)
	4. XOR gate logic (Bitwise)


- Feed the outputs of all four functional paths into the data input channels ($I_0, I_1, I_2, I_3$) of your 4-to-1 Multiplexer.
- Connect the select inputs ($S_1, S_0$) to the Multiplexer control lines to select the active result $Y_i$.
- Pass carry lines ($C_i$ in, $C_{i+1}$ out) explicitly into and out of the Full Adder block.

---

### Part 3: Complete 4-Bit ALU Architecture (30 Points)

Cascade four 1-Bit ALU Slices ($Bit_0, Bit_1, Bit_2, Bit_3$) into a complete system diagram.

- Bus Connections: Correctly route the 4-bit operand buses ($A_0..A_3$ and $B_0..B_3$) to their respective bit slices.
- Ripple Carry Propagation: Chain the carry-out ($C_{i+1}$) of each lower-order bit slice directly into the carry-in ($C_i$) of the next higher-order bit slice.
- Global Control Signals: Distribute the 2-bit operation selection bus ($S_1, S_0$) in parallel to every bit slice.
- Output Overflow: If there is an overflow during addition have signal $V$ turned on


---

## Grading Rubric

| Section | Points | Criteria |
| --- | --- | --- |
| **Part 1a: Full Adder Schematic** | 20 | Correct gate-level implementation of Sum and Carry outputs. |
| **Part 1b: 4-to-1 MUX Schematic** | 20 | Correct decoding gate array selecting inputs based on $S_1, S_0$. |
| **Part 2: 1-Bit ALU Slice** | 30 | Correct integration of arithmetic adder, bitwise logic, and MUX selection. |
| **Part 3: 4-Bit ALU Diagram** | 30 | Correct ripple carry chaining, bus routing, and global control distribution                  |
| **Total** | **100** |  |

---

## Submission Guidelines

Submit a single file named `CS220-HW3-Lastname.pdf` containing:
	1. **Sub-circuit Gate Diagrams** (Full Adder and 4-1 MUX).
	2. **1-Bit ALU Slice Diagram**.
	3. **Complete 4-Bit ALU System Schematic**.