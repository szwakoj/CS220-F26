# C Review: Building a Mini `xxd` — Binary File Inspector

## Due Date: 9/19/ (recommended ~2 weeks before HW1)

## Description

Before we get into manipulating image files at the byte level in HW1, we're going to warm up the C muscles that assignment depends on: pointers and arrays, structs, dynamic memory, string handling, and file I/O — including opening a file in **binary mode** and reading its raw bytes.

To do this, you're going to build a simplified version of a real, extremely common Unix utility: `xxd`. If you've used it before (including in lab), you already know what it does — it dumps the raw contents of any file as hexadecimal bytes, with a readable ASCII sidebar next to each row. If you haven't used it, try it now on any file you have lying around:

```
xxd myfile.txt | head
```

You'll see output that looks something like this:

```
00000000: 4865 6c6c 6f2c 2077 6f72 6c64 2100 0a          Hello, world!...
```

Reading left to right:

- `00000000:` — the **offset** into the file, in hex, telling you which byte this row starts at
- `4865 6c6c 6f2c 2077 6f72 6c64 2100 0a` — the raw bytes of the file, each shown as a two-digit hex number
- `Hello, world!...` — the same bytes, shown as ASCII characters where printable, and a placeholder (usually `.`) where not

That's it. That's the whole tool. It's simple to describe, but building it touches almost everything you'll need for the rest of the semester:

- Opening and reading a file in **binary mode**, not just text mode
- Treating a file's contents as a plain array of bytes
- Using a **struct** to represent one row of output
- Growing a **dynamic array** of those rows as you read more of the file
- Formatting output carefully with `printf`
- Parsing command-line arguments (flags like `-c`, `-s`, `-l`)

Notably, none of this requires you to know or use bitwise operators (`&`, `|`, `^`, `<<`, `>>`) or hex/binary literal notation in your own code — you're just *printing* bytes as hex using `printf`'s `%x` format specifier. That part comes in HW1. Consider this the on-ramp: by the time HW1 asks you to open a file in `"rb"` mode, parse a header, and read raw pixel bytes, you'll have already done exactly that once here.

**A note on verification:** unlike a lot of homework, you can check your own work exactly, byte for byte, against the real thing:

```
xxd myfile.txt > real_output.txt
./myxxd myfile.txt > my_output.txt
diff real_output.txt my_output.txt
```

If `diff` shows nothing, you match. Use this constantly while developing — don't wait until submission to find out you're off by one somewhere.

## Overview

Using the starting point provided, you are to create a C project with two main files:

1. `xxd_clone.c` — Your function implementations
2. `main.c` — Argument parsing and driver logic that calls your functions
	1. Should `#include "xxd_clone.c"`

The starter zip includes a few sample files of varying size (including at least one whose length is *not* a clean multiple of 16 bytes — pay attention to how your program handles the last, partial row).

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
- The caller is responsible for `free`-ing the returned buffer — document this clearly with a comment

**Hints:**

- `fseek(fp, 0, SEEK_END)` followed by `ftell(fp)` is a classic way to get file size, followed by `fseek(fp, 0, SEEK_SET)` to rewind before reading
- Don't forget to `fclose` before returning

### Task 2: Struct-Based Row Representation (20 points)

Rather than printing directly from the raw buffer, you'll organize the file's contents into an array of rows first. This is good practice for representing structured data with structs, and it's a pattern you'll reuse constantly.

**Struct definition (put this in your header/source, adjust as needed):**

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
- Use `malloc`/`realloc` to build a dynamically growing array of `HexRow`s — do not hardcode a maximum file size
- The final row may have fewer than `bytes_per_line` valid bytes — set `byte_count` accordingly, and make sure you don't read past the end of `data`
- Set `*out_row_count` to the total number of rows created
- Caller is responsible for freeing the returned array

### Task 3: Printing the Hex + ASCII Dump (25 points)

Create the function that actually produces `xxd`-style output from your row array.

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
- Match the general shape of real `xxd` output closely enough that a human can visually compare them; exact spacing (e.g. `xxd`'s grouping of bytes in pairs) is a stretch goal, not a requirement — see Task 5

**Hints:**

- `isprint()` from `<ctype.h>` tells you whether a byte is a printable ASCII character
- Build the hex portion and ASCII portion as you go, one row at a time — don't try to build the whole output as one giant string first

### Task 4: Command-Line Flags (25 points)

Update `main.c` to parse real command-line flags, the way actual `xxd` does.

**Required flags:**

- `-c <width>` — bytes per line (default 16 if not specified)
- `-s <offset>` — start dumping from this byte offset instead of the beginning of the file
- `-l <length>` — only dump this many bytes, instead of the whole file
- `-o <output_file>` — write output to a file instead of `stdout`

**Requirements:**

- Parse `argv` manually using `strcmp` (no `getopt` requirement, though you're welcome to use it if you already know it)
- Validate arguments — if a filename is missing, or a flag's value doesn't parse as a number, print a usage message and exit cleanly rather than crashing
- `-s` and `-l` should affect *which* bytes get read/dumped, not just which get displayed — i.e., don't read the whole file if `-l` says you only need the first 100 bytes
- If `-o` is given, all dump output goes to that file instead of the terminal

**Hints:**

- `atoi`/`strtol` for parsing numeric flag values
- A minimal usage message (e.g. `Usage: myxxd [-c width] [-s offset] [-l length] [-o outfile] <file>`) is expected if arguments are malformed

### Task 5: Stretch Goals (not required, up to 15 bonus points)

Pick any of the following if you want to push further:

- Match real `xxd`'s exact spacing, including its grouping of bytes into pairs with an extra space every 8 bytes
- Add a `-r` "reverse" mode that reads a hex dump back in and reconstructs the original binary file
- Add a byte-pattern search: given a short ASCII string, scan the buffer and print every offset where it occurs
- Add a `-g` flag to change the byte-grouping width in the hex output (matches real `xxd`'s `-g`)

## Grading Rubric

- Task 1: Reading a file into a byte buffer (15 points)
- Task 2: Struct-based row representation (20 points)
- Task 3: Hex + ASCII dump output (25 points)
- Task 4: Command-line flag parsing (25 points)
- Code style and comments (5 points)
- Memory management — no leaks, no missing frees (10 points)
- **Total: 100 points** (+ up to 15 bonus for Task 5)

## Verifying Your Work

Before submitting, run your program against real `xxd` on at least three different files (including one whose size is not a multiple of 16, and one that's empty or very small) and confirm with `diff` that your output matches. Include a short note in your submission (a comment in `main.c` or a `NOTES.md`) listing which files you tested and confirming they matched.

## Looking Ahead

The pattern you're building here — open a file in binary mode, read raw bytes into a buffer, interpret those bytes according to some structure, and produce readable output — is exactly the pattern HW1 (the Netpbm image assignment) builds on, except there the "structure" is a PGM/PPM header and pixel grid instead of a generic hex dump. It's also the same basic pattern you'll eventually use to inspect and build memory/register state in a CPU simulator later in the course, so it's worth understanding solidly now.

## Submission Guidelines

### What to Submit

- `xxd_clone.c` — Your function implementations
- `main.c` — Driver program with argument parsing
- A short `NOTES.md` documenting the files you tested against real `xxd` and confirming your output matched