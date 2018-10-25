## Proper commit messages are important

Seven rules of making a great commit message:

1. Limit the subject line to around 60 characters 
2. Separate subject from body with a blank line 
3. Do not end the subject line with a period
4. Use the imperative mood in the subject line 
5. Wrap the body at 80 characters
6. Use the body to explain what and why vs. how 
7. Commit one change at a time. For example changing a default setting, adding something new and fixing a bug are three separate commits.

More info here in a post from [Chris Beam](https://chris.beams.io/posts/git-commit/) and there is, obviously, much more to find about this all over the internet.

## Branches and workflow

Work in progress should be done in a branch, prefix it with WIP, or work in your own forked repo.
We have a rebase-style workflow. Not a merge one.
Most important: once ready for checking / discussing or inclusion into the master branch: first squash / rebase / split / clean / reword. See cleaning up section below.

Releases are in the master branch
Don't push -f in a master branch (duh.. ). But don't by shy on push -f in your work branches either.
Once code is included in the master branch, remove the working branch

## Cleaning up before review and/or inclusions in master

Often, when working on a feature for a while, the git history will look similar to this (oldest on top):

1. do a
2. do b and c
3. readme: add explanation
4. fix a
5. readme: improve explanation
6. etcetera

Before asking anyone to review, and also before putting that in master, it needs to be cleaned up. Meaning some commits can be combined, others perhaps split up, and also check all the commit titles and messages. See above seven rules for guidelines on that.

Back to the example: there is no point in cluttering up the history of that project with item 4 and 5 in above list. 4 needs to be squashed with 1, and perhaps number 2 needs to split up. To do this, use git rebase -i, and afterwards push -f to push your WIP branch to the remote. 

In case you want to preserve history while working still working on the issue, then simply number the branches. Ie start a new one every time: WIP-bbb1, WIP-bbb2 etcetera. Same when working on a feature for a long time, on an active project: it might make sense to now and then rebase your work on master to make sure there are no conflicts. Steps to take in that case are:

1. Update your master branch (git fetch origin master:master, or more simples, git checkout master && git pull && git checkout your-wip-branch)
2. (optionally) rename your branch: git checkout -b WIP-mywork-2
3. Put your commits on top of the updated master branch: git rebase master

## Releasing and tagging
 
1. Tag it: git tag -a 1.20

* do not put an underscore in the version number, fe 1_20 is not good
* make sure to stick to whatever the default tags names in your project are

2. After hitting enter, the editor for the tag message shows up, in there, put the change log. 
3. Push the tag: git push origin 1.20
4. Add the same change log to the [wiki](https://github.com/victronenergy/venus-private/wiki/todo)

More info can be found here: https://github.com/victronenergy/venus/wiki/release-cycle