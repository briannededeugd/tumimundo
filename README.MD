# TuMi Mundo
Welcome to the attention test of TuMi Mundo! This test is intended for children aged six months to a year, and tests their language recognition skills by tracking their head movements during a recording being played. When the babies' target language is heard, the ideal scenario suggests that we'll log their attention, and vice versa. To achieve this, we've implemented face-recognition software that arbiturarily tracks the head movement of the baby without recording them or saving any visuals, protecting the privacy and identities of the TuMi Mundo users.

## Table of Contents

1. [How To Install](#how-to-install)
2. [Collaboration rules](#collaboration-rules)
    - [Merging into your branch](#merging-into-your-branch)
    - [Commit conventions](#commit-conventions)
3. [Credits and Thanks](#credits-and-thanks)

## How To Install

Assuming you have `Git` and `npm` installed on your device.
1. Click the green `Code` button on this page and copy the string that's given;
2. Open your terminal and type `git clone`, then paste the string after it and click Enter;
3. Change directories to the `tumimundo` folder by then typing `cd tumi-mundo` and click Enter;
4. Install all necessary dependencies by typing `npm i`;
4. Run the app in the localhost by using `npm run dev`.

## Collaboration rules
To make sure that we're working as efficiently as possible, we've established collaboration rules, which serve as a resource as to how we streamline our work to create one whole. This includes instructions on how we merge the main branch into our seperate branches, how we commit and make use of commit messages, and what labels we utilize (and when). 

### Merging into your branch

**Steps**

1. On the main branch, do `git pull`;
2. Then go to your branch using `git checkout 'your-branch'`;
3. Next, do `git merge main`.

Now your branch is up-to-date with the main!

### Commit conventions
As a team, we've agreed to make use of commit conventions in order to keep track of what we've accomplished with ease as well as to communicate this at a simple glance. Commit messages start with their code, begin with a capital letter and are written in imperative language ('gebiedende wijs' in Dutch).

CODES:
- `INIT` - Initial commit / changes;
- `ADD` - A change in the file structure, like (re)moving files or adding them;
- `FEAT` - A new feature added to the app;
- `STYLE` - Styling the app;
- `README` - Documentation;
- `COM` - Comments for clarification

## Credits and Thanks
This app was developed for Jaap van Woudenberg and Roy ter Haar, in collaboration with the University of Leiden, who we'd like to thank for their genuine enthusiasm and passion. We'd also like to thank professor Claartje Levelt for her insights and opening her lab at the University of Leiden to our curious eyes and burning questions. 
