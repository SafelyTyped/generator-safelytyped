# Scaffolding For SafeTypes

## Introduction

This is our tool to quickly and easily create:

- skeleton repos

for SafelyTyped and other Typescript projects.

## Installation

In your terminal:

```shell
sudo npm install -g yo generator-safelytyped
```

## How To Run

In your terminal:

```shell
# creates a skeleton TypeScript library project
cd $HOME/Projects/myGitOrganisationOrUser
yo safelytyped:create:library <folder-name>

# creates a skeleton branded type
cd $HOME/Projects/myGitOrganisationOrUser/ProjectName
yo safelytyped:create:branded <new-type> <string|number>

# creates a skeleton refined type
cd $HOME/Projects/myGitOrganisationOrUser/ProjectName
yo safelytyped:create:refinedtype <new-type> <RefinedNumber|RefinedString>

# creates a skeleton ValueObject
cd $HOME/Projects/myGitOrganisationOrUser/ProjectName
yo safelytyped:create:valueobject <new-type> <any[]|object>
```