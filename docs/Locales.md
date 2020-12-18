# Locale files

The locale files contain the language strings and an array of values that is used in calculating the country specific probabilities.

## Values

```yaml
values:
  intercept: 19.361
  shrinkageFactor: 0.92
  weightAdjustedFactor: 0.106
  cutoff: 0.3
  proteinTarget: 0.8
  targetList:
    - proteinTarget: 0.8
    - proteinTarget: 1.0
    - proteinTarget: 1.2
```

* `intercept`, `shrinkageFactor` and `weightAdjustedFactor` are used in the algorithm for calculating the probability.
* `cutoff` and `proteinTarget` are used in the results for the elderly.
* `targetList` contains a list of norms that can be used by professionals

## Language strings

Language strings are structured as follows: 

```yaml
home:
  button: To the screener
  proversion: Dit is de Eiwit screener voor onderzoekers.
```
take note of the indentation, this can also be written as:

```yaml
home.button: To the screener
home.proversion: Dit is de Eiwit screener voor onderzoekers.
```
no indentation needed, but maybe a little less clear.

### YAML caveats

As the language strings are stored in a YAML file, characters like `:` have a special meaning. To take care of that, we can use quotation:
```yaml
session.your_id: "Your session ID is: {session_id}"
```
or the block style indicator `|`:
```yaml
session.your_id: |
  Your session ID is: {session_id}
 ```
 
 The block style indicator can also be used to add a large block of text:
 ```yaml
 professionals: |
  The Protein Screener (Pro55+) is a short (10 food items) questionnaire
  that estimates the chance on a low protein intake (<1.0 gram /per kilogram body
  weight/day) for older adults. The Protein screener (Pro55+) is developed by the
  Vrije Universiteit Amsterdam (the Netherlands).
```
Here also, take note of the indentation.

### Formatting strings

To format strings, you can use [Markdown](https://www.markdownguide.org/cheat-sheet/) syntax. For example:
```yaml
Het eten van **voldoende** eiwit is belangrijk voor het behoud van spiermassa en botten.
```
will translate to

Het eten van **voldoende** eiwit is belangrijk voor het behoud van spiermassa en botten.

```yaml
##### Toelichting gebruik voorspelde kans
```
will translate to

##### Toelichting gebruik voorspelde kans
