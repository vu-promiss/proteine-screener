# Modifying ProteinScreener

There are several things that can be modified rather easily without rebuilding the application.

## Configuration

The main configuration file for the webapplication is found in `public/config.json`.

The structure of the configuration json file is like this:
```json
{
  "locales": [
    "en",
    "nl",
    "fi"
  ],
  "cutoff": 0.3,
  "showAutonextButton": false,
  "debug": false,
  "apiBaseUrl": "/api/"
}
```
* The **locales** array contains the shortcodes to the available locale files. If you want to add a new language, add it to this array.
* **cutoff** is the value that determines if the protein intake is below the threshold
* **showAutonextButton** if this is set to `true`, a button is shown that toggles 'auto next' which will cause the app to move on to the next question without pressing 'continue'
* **debug** if set to true, show some debug information in the app
* **apiBaseUrl** address for the backend API. It is possible to point this to a different server by entering the full address (https://server/api/)

Please check the validity of the json before committing. Use a linting application like https://jsonlint.com

## Language files

Language files live in `public/locales`. They are loaded every time the webapp is started. Updates to these files are best done via a Pull Request in https://github.com/vu-promiss/proteine-screener

Please check the validity of the language files json before committing them. Use a linting application like https://jsonlint.com

## Quiz

The structure of the quiz is found in `public/quiz.json`. The structure is as follows:

### Questions

All questions have an unique **id** that is used to identify the question and is also used in the locale files to reference the locale strings.

All questions have a type. There are three types of questions:

* **info** contains only text.
* **bmi** contains the special BMI form
* **question** contains a regular question

Questions with the **type** of **question** also have an **answers** entry that corresponds to the answers below.

```
---
questions:
- id: intro
  type: info
- id: N14a_0
  type: question
  answers: weekly_intake
...
- id: N08b_0
  type: question
  answers: slices
```

### Answers

There are 4 types of answers:

* **slices** a list of slices answers consisting of an **id**, a **text** entry and a **count** entry
* **glasses** a list of glasses answers consisting of an **id**, a **text** entry and a **count** entry
* **meat** a list of meat answers consisting of an **id**, a **text** entry, a **fraction** entry and a **picture** entry
* **weekly_intake** a list of weekly intake answers consisting of an **id**, a **text** entry and a **count** entry

All text entries correspond to the same item in the locale files.


```
answers:
  slices:
  - id: 1
    text: less_than_one
  - id: 2
    text: slice
...
  - id: 14
    text: more_than_slices
    count: 12
  glasses:
  - id: 1
    text: less_than_one
  - id: 2
    text: glass
    count: 1
...
  - id: 14
    text: more_than_glasses
    count: 12
  meat:
  - id: 0
    text: no_meat
    picture: plate_0
...
  - id: 5
    text: plate
    fraction: 3/4
    picture: plate_75
  weekly_intake:
  - id: 1
    text: not_in_four_weeks
  - id: 2
    text: one_in_four_weeks
...
  - id: 10
    text: day_week
    count: 7
```
