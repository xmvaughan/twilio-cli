# A Twilio CLI

[![Travis Build Status](https://travis-ci.com/twilio/twilio-cli.svg?token=8pBrDtYneMQqFq8wVpYP&branch=master)](https://travis-ci.com/twilio/twilio-cli)[![Appveyor Build Status](https://ci.appveyor.com/api/projects/status/48hf89rslhjhn7ca?svg=true)](https://ci.appveyor.com/project/TwilioAPI/twilio-cli)[![codecov](https://codecov.io/gh/twilio/twilio-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/twilio/twilio-cli)

## ⚠⚠⚠⚠ Pre-release software warning ⚠⚠⚠⚠

This software is in pre-release status and not currently supported. We are looking for community feedback on what type of CLI tool would be the most useful for Twilio users.

⚠⚠⚠⚠

## Prerequisites

1. [Node.js](https://nodejs.org/) >= 8.0
1. Running on Linux? Depending on your distribution, you will need to run the following command: <br>
   **Debian/Ubuntu**: `sudo apt-get install libsecret-1-dev` <br>
   **Red Hat-based**: `sudo yum install libsecret-devel` <br>
   **Arch Linux**: `sudo pacman -S libsecret`

Eventually, the plan is to have self-contained packages for \*nix systems and an installer for Windows with no need for manually installing prerequisites.

## Setup

1. Install the CLI globally using `npm install -g twilio-cli`

## Setup, if you want to hack on the project

1. Clone [this repo](https://github.com/twilio/twilio-cli).
1. From the repo directory, run: `npm install`
1. Run `./bin/run` from the repo directory to run the CLI.

## Basic usage

### Step 1 - Login (aka add a project)

```
twilio login
```

which is an alias for:

```
twilio project:add -p default
```

This is for caching your credentials for your _existing_ Twilio account (aka Project) locally. Note, while you are prompted for your Account SID and Auth Token, these are not saved. An API Key is created (look for "Twilio CLI on [hostname]" in the console) and stored in your system's keychain.

### Step 2 - Explore

```
twilio
```

Lists all available commands.

```
twilio number:list
```

Lists all your phone numbers. (`number` is a shorthand alias for the full resource name, `incoming-phone-number`).

Add `--help` to any command to get help (e.g. `twilio number:list --help`)

### Webhooks

You can set a webhook on a phone number like so:

```
twilio number:update [PN sid or E.164] --sms-url http://url
```

That sets the primary SMS url. There are also options for setting the voice url, fallback url's, and methods for each. Run `twilio number:update --help` for a full list of options.

### Ngrok integration

When you set a webhook, if you specify a URL that uses the host name of `localhost` or `127.0.0.1`, the Twilio CLI will automatically create an ngrok tunnel for you and set your webhook to the new ngrok URL. For example:

```
twilio number:update [PN sid or E.164] --sms-url http://localhost:5000/handle_sms
```

### Output formats

All command output is sent to `stdout` (whereas [logging messages](#Loggingmessages) are sent to `stderr`).

By default, the output is formatted in human readable form in a columnar format like so:

```
SID                                 Phone Number  Friendly Name
PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  +1209242XXXX  SIP testing
PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  +1646887XXXX  Congress hotline
PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  +1209337XXXX  DAVID'S TWILIO CONTACT
```

Many `list` commands will allow you to specify a `--properties` option to specify which columns you'd like to display. For example, to display only the Phone Number and SMS Url columns, you would pass `--properties "phoneNumber, smsUrl"`.

Note that currently, the column names must match the JSON property names in the Twilio API.

#### JSON output format

On _any_ command, you can add `-o json` to change the output format to JSON. When you choose JSON, the command will send the _entire API response_ to `stdout` as JSON. You can then pipe to tools like [jq](https://stedolan.github.io/jq/) to parse the JSON.

#### Tab separated values

To change the output format to tab separated values (TSV), add `-o tsv` to the command line. This format is useful for loading into spreadsheets or for other machine processing. Like the default, columnar output format, you can use the `--properties` option to specify which columns you would like included.

### Logging messages

All debug, informational, warning, and error information is sent to `stderr`. This is so it can be easily separated from the command output. You can decide what level of logging you'd like by using the `-l` option. The valid levels of logging messages are `debug`, `info`, `warn`, `error`, and `none`.

### Multiple Twilio accounts/projects

To store credentials for multiple projects, you can use a shorthand "project id" which is just an easy to remember, short string to identify the project. (If you've used `git` before, it's like the name you assign to a remote like "origin".)

When you run `twilio login`, it stores your credentials under a project called `default`. This is the project that will be used for all subsequent commands.

To add a second project after the default project, you can run `twilio login -p my_other_proj` (using whatever identifier you'd like in place of `my_other_proj`). Then, when you run subsequent commands, just include the `-p my_other_proj` in the command (e.g. `twilio number:list -p my_other_proj`).

## Feedback

Please file a GitHub issue in this repository for any feedback you may have.

## License

MIT
