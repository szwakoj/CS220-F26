# Homework 2: Number Conversions 

## Due Sunday 10/10/26

## Description:
Number systems are fundamental to computer science. In this assignment, you'll convert numbers between various bases both by hand and programmatically. The first section tests your understanding of the mechanics of base conversion. The second section has you build a general-purpose base converter that works with any base from 2 to 64.
## How to Hand In

- Follow instructions to produce the following files:
```
/
└── CS220-HW2-Lastname/
    ├── conversions.png/.jpg/.pdf
    └── converter.c
```
	
- With all of the above files in a folder, zip it and name it:
	-  CS220-HW2-Lastname.zip
	- Replace "LastName" with your last name
- Submit the zip file to Brightspace

## Section 1: Conversions

Do these conversions by hand. You can write them out on paper, take a picture, scan them, or do it digitally, whatever works. Just make sure your final answer shows your work and is legible. For each conversion, show the steps you took to get there.

### Part A: Converting to Decimal

Convert the following numbers to decimal (base 10). Identify the base of the original number using subscripts.

1. 10110₂ (binary)
2. 1A3₁₆ (hexadecimal)
3. 42₈ (octal)
4. 23₅ (base 5)
5. F2₁₆ (hexadecimal)
6. 1101₂ (binary)
7. 341₉ (base 9)
8. 56₁₂ (base 12)

### Part B: Converting from Decimal

Convert the following decimal numbers to the specified base. Show your work (whether you're using division/modulo or repeated subtraction).

1. 47 → binary (base 2)
2. 255 → hexadecimal (base 16)
3. 100 → octal (base 8)
4. 82 → base 5
5. 1024 → binary (base 2)
6. 300 → base 12
7. 199 → hexadecimal (base 16)
8. 64 → base 4


## Section 2: Converter Program

You're going to build a program that converts numbers between any two bases from 2 to 64. 

### Setup

Your program will read from a file (provided on the command line). Each line in the file contains three pieces of data:

```
<source_base> <number_string> <target_base>
```

For example:

```
16 FF 2
10 255 16
2 11111111 10
```

Your program should convert the number string from the source base to the target base, and write each result to `output.txt`.

A zip containing some test files and the generator script for the test files is given to you [here](./testing_files.zip). The max length of digits that I used to generate the test sets was 10.

### Task 1: Define Your Symbol Set 

Create a character array containing all 64 symbols you'll use as "digits" across all bases, in order. You must use these symbols as I used them in the generator script

```c
const char* SYMBOLS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/";
```

Place this at the top of your file where all functions can access it.

### Task 2: Base Conversion Function 

Create a function with this signature:


```c
char* convert_base(const char* number_string, int source_base, int target_base, const char* symbols);
```

**Requirements:**

- Takes a `number_string` in the `source_base` and converts it to the `target_base`
- `symbols` is your character array of 64 possible digits
- `malloc` a buffer large enough to hold the result, convert the number, and return a pointer to that buffer
- The caller is responsible for `free`-ing the returned buffer; document this with a comment
- You may use either **division/modulo** or **repeated subtraction** for the conversion (or a combination)  use whichever makes sense to you
	- I will say that the division/modulo method is the most mechanistic
- For invalid input (unknown symbols, bases outside 2-64), return `NULL`

**High-level approach:**

1. Convert the input string from `source_base` to decimal (intermediate representation)
2. Convert the decimal result to `target_base`
3. Return the result as a string

### Task 3: File Processing and Output 

Update `main()` to:

- Accept a command-line argument: the name of the input file
- Read each line from the input file
- For each line, parse the source base, number string, and target base
- Call `convert_base()` with those values
- Write the result to `output.txt` in the format: `<original_number> (base <source>) = <result> (base <target>)`
- If a conversion fails, write an error message to `output.txt` instead

**Example output file:**

```
FF (base 16) = 11111111 (base 2)
255 (base 10) = FF (base 16)
11111111 (base 2) = 255 (base 10)
```

**Requirements:**

- If no input file is provided on the command line, print a usage message and exit cleanly
- If the input file can't be opened, print an error and exit cleanly
- All results go to `output.txt` (create it if it doesn't exist, overwrite if it does)

## Grading Breakdown

|Component|Points|
|---|---|
|Section 1: Hand Conversions (8 problems)|20|
|Task 1: Symbol Set Definition|3|
|Task 2: Base Conversion Function|40|
|Task 3: File Processing and Output|20|
|Code style and comments|8|
|Memory management — no leaks, all buffers freed properly|6|
|Correct file/folder naming & zip submission|3|
|**Total**|**100**|

### Verification

Test your program with a few known conversions:

```
./converter test_file_1.txt
cat output.txt
```
### Hints

- When converting _from_ an arbitrary base, you need to look up each character's value in your symbol set (reverse lookup)
- When converting _to_ an arbitrary base, you use the symbol set to map each digit value back to its character