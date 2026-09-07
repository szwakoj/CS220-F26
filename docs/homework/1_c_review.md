# C Review: Building `xxd`, a binary file explorer

## Due Date: 9/19/26

## Description

In order to refresh up your C skills and begin getting comfortable with memory at a fundamental level, we will be making a small clone of `xxd` a binary file explorer. `xxd` was used in the Compilation Lab to examine the process of compilation by viewing the different by products of `gcc`. Here we will be making a clone of the program in order to start understanding memory generally, while getting your hands warmed up for the rest of the semester.

`xxd` dumps the raw contents of any file as hexadecimal bytes, with a readable ASCII sidebar next to each row. If you haven't used it, try it now on any file you have lying around:

```
xxd myfile.txt | head
```

You'll see output that looks something like this:

```
00000000: 4865 6c6c 6f2c 2077 6f72 6c64 2100 0a          Hello, world!...
```

Reading left to right:

- `00000000:` - the offset into the file, in hex, telling you which byte this row starts at
- `4865 6c6c 6f2c 2077 6f72 6c64 2100 0a` - the raw bytes of the file, each shown as a two-digit hex number
- `Hello, world!...` - the same bytes, shown as ASCII characters where printable, and a placeholder (usually `.`) where not

That's it. That's the whole tool. It's simple to describe, but building it touches almost everything you'll need for the rest of the semester:

- Opening and reading a file in **binary mode**, not just text mode
- Treating a file's contents as a plain array of bytes
- Using a **struct** to represent one row of output
- Growing a **dynamic array** of those rows as you read more of the file
- Formatting output carefully with `printf`

**A note on verification:** unlike a lot of homework, you can check your own work exactly, byte for byte, against the real thing:

```
xxd myfile.txt > real_output.txt
./myxxd myfile.txt > my_output.txt
```

## Overview

Using the starting point provided, you are to create a C project with two main files:

1. `xxd_clone.c` - Your function implementations
2. `xxd_clone.h` - Your function declarations
3. `main.c` - Argument parsing and driver logic that calls your functions
	1. Should `#include "xxd_clone.h"`

### Task 1: Reading a File into a Byte Buffer (15 points)

Create a function that reads an entire file's raw contents into memory.

**Function signature:**

```c
unsigned char* read_file_bytes(const char* filename, long* out_size);
```

**Requirements:**

- Open the file in binary mode (`"rb"`), not text mode
- Determine the file's size (`fseek`/`ftell`, or `stat`)
- `malloc` a buffer of the right size
- `fread` the entire file into that buffer
- Set `*out_size` to the number of bytes read
- Return `NULL` (and set `*out_size` to `0`) if the file can't be opened
- The caller is responsible for `free`-ing the returned buffer

**Hints:**

- `fseek(fp, 0, SEEK_END)` followed by `ftell(fp)` is a classic way to get file size, followed by `fseek(fp, 0, SEEK_SET)` to rewind before reading
- Don't forget to `fclose` before returning

### Task 2: Struct-Based Row Representation (20 points)

Rather than printing directly from the raw buffer, you'll organize the file's contents into an array of rows first. This is good practice for representing structured data with structs, and it's a pattern you'll reuse constantly.

**Struct definition (put this in your header, adjust as needed):**

```c
typedef struct {
    long offset;                  // byte offset this row starts at
    unsigned char bytes[16];      // the raw bytes in this row
    int byte_count;               // how many bytes are actually valid (last row may be partial)
} HexRow;
```

**Function signature:**

```c
HexRow* build_hex_rows(const unsigned char* data, long size, int bytes_per_line, int* out_row_count);
```

**Requirements:**

- Given the byte buffer from Task 1, break it into rows of `bytes_per_line` bytes each
- Use `malloc`/`realloc` to build a dynamically growing array of `HexRow`s, do not hardcode a maximum file size
- The final row may have fewer than `bytes_per_line` valid bytes, set `byte_count` accordingly, and make sure you don't read past the end of `data`
- Set `*out_row_count` to the total number of rows created
- Caller is responsible for freeing the returned array

### Task 3: Printing the Hex + ASCII Dump (25 points)

Create the function that produces `xxd`-style output from your row array.

**Function signature:**

```c
void print_hex_rows(const HexRow* rows, int row_count, int bytes_per_line);
```

**Requirements:**

- For each row, print:
    - The offset in 8-digit hex, followed by `:`
    - Each byte in the row as a two-digit hex value (use `%02x`), separated by spaces
    - If the row is partial (fewer than `bytes_per_line` bytes), pad the hex section with spaces so the ASCII column still lines up for every row
    - An ASCII sidebar: each byte shown as its character if printable (`isprint`), or `.` if not
- Match the general shape of real `xxd` output closely enough that a human can visually compare them

**Hints:**

- `isprint()` from `<ctype.h>` tells you whether a byte is a printable ASCII character
- Build the hex portion and ASCII portion as you go, one row at a time — don't try to build the whole output as one giant string first

### Task 4: Command-Line Flags (25 points)

Update `main.c` to take in a filename as a command line argument and utilize the functions you created to finalize your version of `xxd`.


**Requirements:**

- Validate argument - if a filename is missing, print a usage message and exit cleanly rather than crashing
- Use your functions in the way they were intended

## Grading Rubric

- Task 1: Reading a file into a byte buffer (15 points)
- Task 2: Struct-based row representation (20 points)
- Task 3: Hex + ASCII dump output (25 points)
- Task 4: Main file (25 points)
- Code style and comments (5 points)
- Memory management - no leaks, no missing frees (10 points)
- **Total: 100 points** (+ up to 15 bonus for Task 5)

## Submission Guidelines

### What to Submit

- `xxd_clone.c` - Your function implementations
- `xxd_clone.h` - Your function declarations
- `main.c` - Driver program 

Organize them like so:
```
/
└── CS220-HW1-Lastname/
    ├── xxd_clone.c
    ├── xxd_clone.h
    └── main.c
```

Compress the folder into `CS220-HW1-Lastname` before handing into Brightspace. 