# C Review: Binary Image Memory Reading/Writing

## Due Date: 2/27/26

## Description

In this homework, you will be learning to manipulate information using raw binary. In order to visualize the various binary operations we are doing, we will be using the PBM/PGM/PPM  image formats as a way of quickly writing pixel information directly to memory.

For more info on the PBM/PGM/PPM file format, the Wikipedia page for them is a pretty good resource along side the specifications that I could find:

- [Netpbm Wikipedia Page](https://en.wikipedia.org/wiki/Netpbm)
- [Netpbm Specifications](https://netpbm.sourceforge.net/)
	- [PBM Spec](https://netpbm.sourceforge.net/doc/pbm.html)
	- [PGM Spec](https://netpbm.sourceforge.net/doc/pgm.html)
	- [PPM Spec](https://netpbm.sourceforge.net/doc/ppm.html)

The spark notes version is that "Netpbm" or "**Net**work **P**ortable **B**it**m**ap Format" is a collection of tools and specifications for portable graphics file formats. They have three main types of portable formats that can be opened by nearly any text editor:

- **PBM** (Portable BitMap Format) - Each pixel is either a 1 or 0, for white or black respectively
- **PGM** (Portable GreyMap Format) - Typically, each pixel can be any number between 0-255 signifying how grey the pixel is, with 0 being black and 255 being white
- **PPM** (Portable PixMap Format) - Each pixel now has three numbers ranging from 0-255, for each red, green, and blue color channels

Each type of file defines ways of writing pixels to an image file in a very general way, it is so general I can show the raw form of the file format. The basic one, PBM, binary numbers, 0 to turn off a pixel and 1 to turn it on. The following .pbm file stores a happy face:

```
P1
10 10
1
0 0 0 0 0 0 0 0 0 0
0 0 1 0 0 0 0 1 0 0
0 0 1 0 0 0 0 1 0 0
0 0 1 0 0 0 0 1 0 0
0 0 0 0 0 0 0 0 0 0
1 0 0 0 0 0 0 0 0 1
0 1 0 0 0 0 0 0 1 0
0 0 1 1 1 1 1 1 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
```

Let's explain line-by-line:

1. `P2` - This is the "magic number" it ultimately decides what format we are using. `P2` specifically refers to the Portable GreyMap Format in ascii, rather than in raw bytes, more on this later.
2. `10 10` -  After the magic number, there is two numbers to represent the width and height in that order. These are used to read the rest of the file, automatically making sure that each pixel is put in the correct location.
3. `1` - This is the scale of all of the numbers, this is saying that the grey scale is maxed at 1 meaning there is only black, 0, and white 1
4. `0 0 0 0 ...` - This is the actual contents of the file. For black and white grey scale images each number represents the value for that pixel to be drawn to the screen.

That "magic number" is the format that is used for identifying how the data will be stored, either as ascii chars that are viewable, or raw binary format for being compact and closer to reality. These are the magic numbers for `.pbm`, `.pgm`, and `.ppm`

- `P1`, `P2`, `P3` = ASCII format (human-readable)
- `P4`, `P5`, `P6` = Raw binary format (more compact)

Fortunately, Sublime Text and other text editors like VSCode and view this images as they live update. Unfortunately, Sublime Text only supports it for `.pgm` and `.ppm` and only in magic number modes `P5` and `P6`, meaning you will only be able to view the ones after you have generated in binary. With this in mind, we will be focusing on `.pgm` and `.ppm` and be generating in raw binary and then viewing the files.

These types of files were picked for this assignment because they are a simple format that represents very closely to how we write directly to memory. With this in mind, we will only be allowing the the use of C binary and hexadecimal numbers for all values other than powers of 2 (0, 1, 2, 4, 8, 16, ...) and heavily relying on C binary/bitwise operators.

To use C binary and hexadecimal number representations:

- Prefix with `0b` for binary numbers
	- `0b1010` for the number 10
- Prefix with `0x` for hex numbers
	- `0xABC` for the number 2748

Using these ideas in this homework you will:

- Write/edit simple binary images in black and white
- Write more complex color images

**Section 1**: Black and White & Greyscale Images

- Random Noise (BW and Greyscale)
- Bit-Plane an Image
- Bitwise Patterns

**Section 2**: Color Images

- Random Noise 
- Bitwise Patterns
- Bit-Plane an Image
- Color Channel Fragmentation and Mixing

## **Section 1**: Black and White & Greyscale Images

Click [here](../homework/HW1_start.zip), to download the starting point that I have created for you. It is also on Brightspace, under Content->Homework 1. Unzip it into the place you are completing Homework 1, Section 1. 

This code will output a simple greyscale image that is a gradient that goes from left to right. Nothing special.

It also contains the images you will read in and use for the parts that require inputs.

### Overview

Using the starting point as a going off point you are to create a C project with two main files for this section:

1. `black_and_white.c` - Function declarations for each problem without them being used
2. `main.c` - Using all of the aforementioned functions to generate all images in the current directory with correct names
	1. Should `#include "black_and_white.c"`

All generated images are to be saved as `.pgm` files in this section.

### Task 1: Random Noise Generator (15 points)

Create a function that generates random noise images in both black & white and greyscale

**Function signature:**

```c
void generate_random_noise_bw(const char* filename, int width, int height);
void generate_random_noise_grey(const char* filename, int width, int height);
```

**Requirements:**

- Use `rand()` to generate random pixel values
- For black & white: each pixel should be randomly 0 or 1
	- This means that the max value must be set at 1
- For greyscale: each pixel should be a random value between 0-255
- Write in binary format (P5)
- Both images should be 256x256 pixels

**Hints:**

- Use `rand() % 2` for binary values
- Use `rand() % 0xFF` for greyscale values
- Remember to seed the random number generator with `srand(time(NULL))` in main

### Task 2: Bit-Plane Extraction (20 points)

Create a function that extracts individual bit planes from a greyscale image.

**Function signature:**

```c
void extract_bit_plane(const char* input_file, const char* output_file, int bit_position);
```

**Requirements:**

- Read a PGM image
- Extract the specified bit plane (0-7, where 0 is LSB and 7 is MSB)
- Create a new PGM where pixels are either 0 or 255 based on that bit
- Use bitwise AND operation to check if a bit is set
- Must use binary/hex number representation (0b...)(0x...)

**Example:** If a pixel value is `0b10110101` (181):

- Bit plane 0 (LSB): 1 → output 255
- Bit plane 4: 0 → output 0
- Bit plane 7 (MSB): 1 → output 255

### Task 3: Bitwise Pattern Generation (25 points)

Create functions that generate images using bitwise operations on pixel coordinates.

**Function signatures:**

```c
void generate_xor_pattern(const char* filename, int width, int height);
void generate_and_pattern(const char* filename, int width, int height);
void generate_or_pattern(const char* filename, int width, int height);
```

**Requirements:**

- For each pixel at position (x, y), calculate the pixel value using:
    - x XOR y
    - x AND y
    - x OR y
- All operations must use binary operators and hex notation 
- Generate 256x256 images
- Output as PGM files

**Hints:**

- These operations create interesting geometric patterns
- The XOR pattern is particularly famous for creating diagonal lines

### Section 1 Grading Rubric

- Task 1: Random noise generation (15 points)
- Task 2: Bit-plane extraction (20 points)
- Task 3: Bitwise patterns (25 points)
- Code style and comments (10 points)
- Proper binary/hex notation usage (10 points)
- Memory management (10 points)
- Proper file I/O (10 points)
- **Total: 100 points**

## **Section 2**: Color Images

### Overview

Now you'll work with PPM (color) images. Each pixel has three color channels: Red, Green, and Blue, each ranging from 0-255.

This calls for the `P6` magic number.

In the section folder, create a new file `color_images.c` with the following functions and use them in `main.c` the same as the previous.

### Task 1: Color Random Noise (15 points)

Create a function that generates random color noise.

**Function signature:**

```c
void generate_random_noise_color(const char* filename, int width, int height);
```

**Requirements:**

- Generate 256x256 image
- Each color channel (R, G, B) should be random (0-255)
- Write in binary format (P6)
- Must write RGB values sequentially for each pixel

### Task 2: Color Bitwise Patterns (20 points)

Create functions that generate color patterns using bitwise operations.

**Function signatures:**

```c
void generate_rgb_pattern_1(const char* filename, int width, int height);
void generate_rgb_pattern_2(const char* filename, int width, int height);
void generate_rgb_pattern_3(const char* filename, int width, int height);
```

**Requirements:**

- Create three DIFFERENT color pattern generators
- Each function must generate a 256x256 PPM image
- Each color channel (R, G, B) must be calculated using a DIFFERENT combination of:
    - The pixel's x-coordinate
    - The pixel's y-coordinate
    - At least TWO different bitwise operations per pattern
- You must use at least 4 of these bitwise operations across all three patterns:
    - XOR (`^`)
    - AND (`&`)
    - OR (`|`)
    - Left shift (`<<`)
    - Right shift (`>>`)
    - NOT (`~`)
- Each channel's formula must produce values in the range 0-255
- You may NOT use the same formula for all three channels in a single pattern
- All numeric constants must be in hexadecimal (0x...) or binary (0b...) notation

**Examples of valid operations:**

```c
// Using coordinates with bitwise ops
R = (x ^ y) & 0xFF;           // XOR coordinates, mask to byte
G = ((x << 2) | y) & 0xFF;    // Shift and OR
B = (~(x & y)) & 0xFF;        // AND then invert
```

**Grading:**

- Pattern 1: Uses at least 2 different bitwise operators (7 points)
- Pattern 2: Uses at least 2 different bitwise operators, different from pattern 1 (7 points)
- Pattern 3: Most creative/interesting pattern (6 points)

**Hints:**

- Start by experimenting with simple combinations
- The `& 0xFF` operation ensures your result stays in 0-255 range
- Different shift amounts create different visual effects
- Combining operators (like `(x ^ y) & (x | y)`) creates complex patterns
- View your images to see if they're interesting before submitting!

### Task 3: Bit-Plane Color Extraction (20 points)

Extract bit planes from color images for each channel separately.

**Function signature:**

```c
void extract_color_bit_plane(const char* input_file, const char* output_file, 
                             char channel, int bit_position);
```

**Requirements:**

- `channel` parameter: 'R', 'G', or 'B'
- Extract specified bit plane from chosen channel
- Output a greyscale PGM showing that bit plane
- Other channels' bits should be ignored

For this ones implementation, show each channel in a different image.
### Task 4: Channel Fragmentation and Mixing (25 points)

Create functions to separate and recombine color channels.

**Function signatures:**

```c
void separate_channels(const char* input_file, const char* r_out, 
                       const char* g_out, const char* b_out);
void mix_channels(const char* input_file_a, const char* input_file_b, 
					const char* output_file);
```

**Requirements:**

- `separate_channels`: Create three color images, for each color channel, where all other color channels are removed
- `mix_channels`: Take two images and xor their color channels together

### Section 2 Grading Rubric

- Task 1: Color random noise (15 points)
- Task 2: Color bitwise patterns (20 points)
- Task 3: Color bit-plane extraction (20 points)
- Task 4: Channel operations (25 points)
- Code style and comments (10 points)
- Proper binary/hex notation (10 points)
- **Total: 100 points**

## Submission Guidelines

### What to Submit
#### Section 1 (in folder named `section1/`):

- `black_and_white.c` - Your function implementations
- `main.c` - Driver program that calls all functions
- All generated `.pgm` files from your program

#### Section 2 (in folder named `section2/`):

- `color_images.c` - Your function implementations
- `main.c` - Driver program that calls all functions (can include black_and_white.c if you want both sections in one main)
- All generated `.ppm` and `.pgm` files from your program

