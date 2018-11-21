# Levenshtein Distance

## Overview

This repository is a Javascript implementation of the [Wagner-Fischer Algorithm](https://en.wikipedia.org/wiki/Wagner%E2%80%93Fischer_algorithm) for computing [Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance).

This algorithm utiliz1es [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming) to compute [edit distance](https://en.wikipedia.org/wiki/Edit_distance). It is based on the observation that a matrix of the edit distances can be flood-filled, with the distance between the two full strings being the last last value computed.

## Example Matrices

```text
┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐    ┌─┬─┬─┬─┬─┬─┬─┬─┐
│ │ │S│a│t│u│r│d│a│y│    │ │ │K│i│t│t│e│n│
├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┼─┼─┼─┤
│ │0│1│2│3│4│5│6│7│8│    │ │0│1│2│3│4│5│6│
├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┼─┼─┼─┤
│S│1│0│1│2│3│4│5│6│7│    │S│1│1│2│3│4│5│6│
├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┼─┼─┼─┤  
│u│2│1│1│2│2│3│4│5│6│    │i│2│2│1│2│3│4│5│
├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┼─┼─┼─┤
│n│3│2│2│2│3│3│4│5│6│    │t│3│3│2│1│2│3│4│
├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┼─┼─┼─┤
│d│4│3│3│3│3│4│3│4│5│    │t│4│4│3│2│1│2│3│
├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┼─┼─┼─┤
│a│5│4│3│4│4│4│4│3│4│    │i│5│5│4│3│2│2│3│
├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤    ├─┼─┼─┼─┼─┼─┼─┼─┤
│y│6│5│4│4│5│5│5│4│3│    │n│6│6│5│4│3│3│2│
└─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘    ├─┼─┼─┼─┼─┼─┼─┼─┤
                         │g│7│7│6│5│4│4│3│
                         └─┴─┴─┴─┴─┴─┴─┴─┘
```

## Implementation Details

Given:

- `source` - the source string
- `target` - the target string
- `m` - the length of `source`
- `n` - the length of `target`
- `i` - any number between `[0, m]`
- `j` - any number between `[0, n]`
- `m` - a matrix of `m x n` elements

The distance from `source[0, i]` to `target[0, j]` is held in `m[j, i]`

### General Cases

- The distance from a `source` to an Empty `target` is equal to `m` (The number of rows)
- The distance from a `target` to an empty `source` is equal to `m` (The number of columns)

```text
        ┌─┬─┐
        │ │ │
        ├─┼─┤                  ┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐
        │ │0│                  │ │ │S│a│t│u│r│d│a│y│
        ├─┼─┤                  ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
        │S│1│                  │ │0│1│2│3│4│5│6│7│8│
        ├─┼─┤                  └─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘
        │u│2│               Distance to an Empty Target
        ├─┼─┤
        │n│3│
        ├─┼─┤
        │d│4│
        ├─┼─┤
        │a│5│
        ├─┼─┤
        │y│6│
        └─┴─┘
Distance from an Empty Source
```