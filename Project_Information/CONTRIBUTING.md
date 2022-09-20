# CONTRIBUTING
---
## Overview

Good coding standards are needed for maintaining consistency across a large project with many contributors. This document explains the general guidelines and standards and how it can be implemented automatically as well. 

## Table of Contents

- [CONTRIBUTING](#contributing)
  * [Overview](#overview)
  * [Table of Contents](#table-of-contents)
  * [Code Style](#code-style)
    + [Code Style Definition](#code-style-definition)
    + [Code Linting](#code-linting)
  * [Issues](#issues)
    + [Using Issue Tracker](#using-issue-tracker)
    + [Bug Reports](#bug-reports)
    + [Pull Request Procedures](#pull-request-procedures)
  * [Pull Request Guidelines](#pull-request-guidelines)
    + [Pull Request Overview](#pull-request-overview)
    + [Only touch relevant files](#only-touch-relevant-files)
    + [Make sure your code is clean](#make-sure-your-code-is-clean)
    + [Make sure you unit test your changes](#make-sure-you-unit-test-your-changes)
    + [Make sure tests pass](#make-sure-tests-pass)
    + [Keep your commit history short and clean](#keep-your-commit-history-short-and-clean)
    + [Be descriptive](#be-descriptive)
    + [Hang on during code review](#hang-on-during-code-review)
  * [Unit Testing](#unit-testing)
  * [Main and Feature Branches](#main-and-feature-branches)
      - [Main](#main)
      - [Develop](#develop)
  * [Continuous Integration](#continuous-integration)


---
## Code Style

### Code Style Definition

Our coding style that will be used project-wide is __StandardJS__ and is defined in this website [here](https://standardjs.com/).  Also if you want to review JS Standard Code Style, you may see the rules for it defined [here](https://standardjs.com/rules.html).

### Code Linting

#### [Install](https://standardjs.com/#install)

The easiest way to use JavaScript Standard Style is to install it globally as a Node command line program. Run the following command in Terminal:

```bash
$ npm install standard --global
```

Or, you can install `standard` locally, for use in a single project:

```bash
$ npm install standard --save-dev
```

#### [Usage](https://standardjs.com/#usage)

After you've installed `standard`, you should be able to use the `standard` program. The simplest use case would be checking the style of all JavaScript files in the current working directory:

```bash
$ standard
Error: Use JavaScript Standard Style
  lib/torrent.js:950:11: Expected '===' and instead saw '=='.
```

If you've installed `standard` locally, run with `npx` instead:

```bash
$ npx standard
```

You can optionally pass in a directory (or directories) using the glob pattern. Be sure to quote paths containing glob patterns so that they are expanded by `standard` instead of your shell:

```bash
$ standard "src/util/**/*.js" "test/**/*.js"
```

**Note:** by default `standard` will look for all files matching the patterns: `**/*.js`, `**/*.jsx`.

#### [What you might do if you're clever](https://standardjs.com/#what-you-might-do-if-youre-clever)

1.  Add it to `package.json`
    
    ```json
    {
      "name": "my-cool-package",
      "devDependencies": {
        "standard": "*"
      },
      "scripts": {
        "test": "standard && node my-tests.js"
      }
    }
    ```
    
2.  Style is checked automatically when you run `npm test`
    
    ```bash
    $ npm test
    Error: Use JavaScript Standard Style
      lib/torrent.js:950:11: Expected '===' and instead saw '=='.
    ```
    
3.  Never give style feedback on a pull request again!

## Issues

For Github's official documentation on issues, see [this](https://docs.github.com/en/issues).
[see also](https://github.com/necolas/issue-guidelines/blob/master/CONTRIBUTING.md)

### Using Issue Tracker
The issue tracker is the preferred channel for [bug reports](https://github.com/necolas/issue-guidelines/blob/master/CONTRIBUTING.md#bugs), [features requests](https://github.com/necolas/issue-guidelines/blob/master/CONTRIBUTING.md#features) and [submitting pull requests](https://github.com/necolas/issue-guidelines/blob/master/CONTRIBUTING.md#pull-requests), but please respect the following restrictions:

-   Please **do not** use the issue tracker for personal support requests (use [Stack Overflow](http://stackoverflow.com/) or IRC).
    
-   Please **do not** derail or troll issues. Keep the discussion on topic and respect the opinions of others.

### Bug Reports
A bug is a _demonstrable problem_ that is caused by the code in the repository. Good bug reports are extremely helpful - thank you!

Guidelines for bug reports:

1.  **Use the GitHub issue search** — check if the issue has already been reported.
    
2.  **Check if the issue has been fixed** — try to reproduce it using the latest `master` or development branch in the repository.
    
3.  **Isolate the problem** — create a [reduced test case](http://css-tricks.com/reduced-test-cases/) and a live example.
    

A good bug report shouldn't leave others needing to chase you up for more information. Please try to be as detailed as possible in your report. What is your environment? What steps will reproduce the issue? What browser(s) and OS experience the problem? What would you expect to be the outcome? All these details will help people to fix any potential bugs.

Example:

> Short and descriptive example bug report title
> 
> A summary of the issue and the browser/OS environment in which it occurs. If suitable, include the steps required to reproduce the bug.
> 
> 1.  This is the first step
> 2.  This is the second step
> 3.  Further steps, etc.
> 
> `<url>` - a link to the reduced test case
> 
> Any other information you want to share that is relevant to the issue being reported. This might include the lines of code that you have identified as causing the bug, and potential solutions (and your opinions on their merits).

### Pull Request Procedures

Good pull requests - patches, improvements, new features - are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

**Please ask first** before embarking on any significant pull request (e.g. implementing features, refactoring code, porting to a different language), otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the project.

Please adhere to the coding conventions used throughout a project (indentation, accurate comments, etc.) and any other requirements (such as test coverage).

Follow this process if you'd like your work considered for inclusion in the project:

1.  [Fork](http://help.github.com/fork-a-repo/) the project, clone your fork, and configure the remotes:
    <pre>
    <h4>Clone your fork of the repo into the current directory</h4>
    git clone https://github.com/<your-username>/<repo-name>
    <h4> Navigate to the newly cloned directory </h4>
    cd <repo-name>
    <h4> Assign the original repo to a remote called "upstream" </h4>
    git remote add upstream https://github.com/<upstream-owner>/<repo-name>
	</pre>

2.  If you cloned a while ago, get the latest changes from upstream:
    
    git checkout <dev-branch>
    git pull upstream <dev-branch>
    
3.  Create a new topic branch (off the main project development branch) to contain your feature, change, or fix:
    
    git checkout -b <topic-branch-name>
    
4.  Commit your changes in logical chunks. Please adhere to these [git commit message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) or your code is unlikely be merged into the main project. Use Git's [interactive rebase](https://help.github.com/articles/interactive-rebase) feature to tidy up your commits before making them public.
    
5.  Locally merge (or rebase) the upstream development branch into your topic branch:
    
    git pull [--rebase] upstream <dev-branch>
    
6.  Push your topic branch up to your fork:
    
    git push origin <topic-branch-name>
    
7.  [Open a Pull Request](https://help.github.com/articles/using-pull-requests/) with a clear title and description.
    

**IMPORTANT**: By submitting a patch, you agree to allow the project owner to license your work under the same license as that used by the project.

## Pull Request Guidelines

The Pull Request guidelines are found [here](https://yeoman.io/contributing/pull-request.html).

### Pull Request Overview

A Pull Request (_PR_) is the step where you submit patches to one of our repositories. To prevent any frustration, you should make sure to **open an issue to discuss any new features** before working on those features. This will prevent you from wasting time on a feature the core team doesn’t see fit for the project scope and goals.

Once you’ve worked on a feature or a bug, it is then time to send a PR. Make sure to follow these steps along the way to make sure your patch lands as soon as possible!

### Only touch relevant files

Make sure your PR stays focused on a single feature. Don’t change project configs or any files unrelated to the subject you’re working. Open a single PR for each subject.

### Make sure your code is clean

Checkout the project [style guide](https://yeoman.io/contributing/style-guide.html), make sure your code is conformant and clean. Remove any debugging lines (`debuggers`, `console.log`).

### Make sure you unit test your changes

Adding a feature? Make sure you add unit tests to support it.

Fixing a bug? Make sure you added a test reproducing the issue.

### Make sure tests pass

All our projects’ unit tests can be run by typing `npm test` at the root of the project. You may need to install dependencies like `mocha`, `grunt` or `gulp`.

### Keep your commit history short and clean

In a large project, it is important to keep the git history clean and tidy. This helps to identify the causes of bugs and helps in identifying the best fixes.

Keeping the history clean means making one commit per feature. It also means squashing every fix you make on your branch after team review.

Are you wondering why it is important to keep the history clean? Read this [article from Isaac Schlueter (ex Node.js Lead)](http://blog.izs.me/post/37650663670/git-rebase). Remember _Git is an editor_.

### Be descriptive

Write a convincing description of your PR and why we should land it.

### Hang on during code review

It is important for us to keep the core code clean and consistent. This means we’re pretty hard on code review!

Code reviews are the best way to improve ourselves as engineers. Don’t take the reviews personally: they’re there to keep Yeoman clean and to help us improve.

Read more about [code reviews here](http://blog.codinghorror.com/code-reviews-just-do-it/).

## Unit Testing

Unit test every piece of code before making a pull request. 

## Main and Feature Branches

#### Main 

The main branch will have our Main Repo's Code. Only push to this branch if a Feature has been approved. 

#### Develop

This is the branch that we develop features in and is the test bed for project variations. Once a feature has been approved it may be merged into main branch.

## Continuous Integration

-- Under Construction --
