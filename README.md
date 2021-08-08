# WildRose

WildRose is a wordlist generator for use with password cracking tools. Input a passphrase and automatically generate variants on each word.

## Usage

### Getting Started
* Make sure you have [**Deno**](https://deno.land) installed.
  * There are no other dependencies as of now. However, thanks to Deno's use of ES modules for handling external packages, if that changes you still won't need to manually install any.
* Run `git clone https://github.com/chaosharmonic/WildRose`, or manually download the project files into a single folder.

Then, run the following command in the same folder where the files are stored:

```
deno run --allow-read --allow-write WildRose.js
```

### Details
Each line of `passphrase.txt` is parsed as a different variation of the passphrase, separating each word with spaces, and using a " mark to skip a word in the sequence. The tool can take phrases of any length, and any number of variations, but assumes the length of all variations is the same.

An example input file is below:

```
hilda garde ii
hild@ gard3 2
hild@ gard3 two
" " iii
" " 3
" " three
```

The script will then generate a list for each part of the sequence, and run various transformations on each word within the list. Words themselves are transformed with varying methods of capitalization (more transformations are planned), and all resulting outputs are then shuffled, combined, and finally sorted to produce the wordlist.

Optionally, you can expand this list further by adding symbols to `punctuations.txt`, on a single line with no separation (example: `.!#@`), in  which case WildRose will generate further variations by appending each to the existing variants of each word.

Below are some (unsorted) examples of outputs using the above:

```
Hilda#GARDE#2!
hild@Gard3.three
hildagardeii
```

Upon completion WildRose will output the final list to a text file, `wordlist.txt`, in the same folder as the rest of the project files.

## Planned Features
* Additional transformations -- custom letter replacement (as seen above, 1337$p3@k is currently manual...), random capitalization, ciphers
* Custom rules for separators and skip characters
* Custom output location
