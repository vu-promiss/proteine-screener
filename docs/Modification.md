# Modifying ProteinScreener

There are several things that can be modified rather easily without rebuilding the application.

## Configuration

The main configuration file for the webapplication is found in `public/config.yaml`.

The structure of the configuration yaml file is like this:
```yaml
locales:
  - en
  - nl
  - fi
  # - uk
showAutonextButton: false
debug: false
apiBaseUrl: "/api/"
quizFile: quiz.yaml
```
* The **locales** array contains the shortcodes to the available locale files. If you want to add a new language, add it to this array.
* **showAutonextButton** if this is set to `true`, a button is shown that toggles 'auto next' which will cause the app to move on to the next question without pressing 'continue'
* **debug** if set to true, show some debug information in the app
* **apiBaseUrl** address for the backend API. It is possible to point this to a different server by entering the full address (https://server/api/)

Please check the validity of the yaml before committing. Use a linting application like https://onlineyamltools.com/validate-yaml

## Language files

Language files live in `public/locales`. They are loaded every time the webapp is started. Updates to these files are best done via a Pull Request in https://github.com/vu-promiss/proteine-screener

Please check the validity of the language files yaml before committing them. Use a linting application like https://onlineyamltools.com/validate-yaml

## Quiz

The structure of the quiz is found in `public/quiz.yaml`. The structure is as follows:

### Questions

All questions have a unique **id** that is used to identify the question and is also used in the locale files to reference the locale strings.

All questions have a type. There are three types of questions:

* **info** contains only text.
* **bmi** contains the special BMI form
* **question** contains a regular question

Questions with the **type** of **question** have a recode entry that determines how the answers will be weighed in the calculation of the probability score. Recode entries always have a `comparison`, a `factor` and a `weight`.
Optionally recode entries can have an `add_answer_to_factor` boolean that will add the value of the answer to the `factor`. There's also `default_factor` that can be used to override the default factor of 1 that is applied when the comparison is not true.

```yaml
  - id: N05b_0
    type: question
    answers: slices
    recode:
      - comparison: "answer == 4"
        factor: 2
        weight: 0.326
      - comparison: "answer == 5"
        factor: 2
        weight: 1.175
      - comparison: "answer >= 6"
        factor: 2
        weight: 2.75
```

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
