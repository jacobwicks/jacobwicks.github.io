---
layout: post
title: 'Using Relaxed JSON'
date: 2020-02-21 16:00:00 -0800
---
When I was writing [line comments]({% post_url 2020-03-14-line-comments-final %}) I had to solve the problem of parsing strings to JSON when the string wasn't quite a properly formatted JSON string. Properly formatted JSON strings have double quotes around the keys and values. 

```
{"key":"value"}
```
But I didn't want the user to have to type a bunch of double quotes. I wanted I wanted to let the user write a JSON object like this:

```
{key: value}
```

# JSON.parse()
I started by using [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse). But `JSON.parse()` requires a properly formatted JSON string. That means you have to type the double quotes.

# eval() - Never use eval!
Next I found the [`eval()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) method. eval() takes a string and runs it as JavaScript code. eval worked! It can take a string without double quotes and turn it into a JSON object. But you should [never use eval!](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Never_use_eval!)

Because:

    eval() is a dangerous function, which executes the code it's passed with the privileges of the caller. If you run eval() with a string that could be affected by a malicious party, you may end up running malicious code on the user's machine with the permissions of your webpage / extension. More importantly, a third-party code can see the scope in which eval() was invoked, which can lead to possible attacks in ways to which the similar Function is not susceptible.

# Write your own JSON parse
Then I tried writing my own JSON parse method that could handle the absence of the double quotes. Parsing objects from strings without given delimiters is a surprisingly complex problem. I got it partially working, but kept coming up with more edge cases that would be inconvenient for the users to deal with. So I looked for a library that had already solved the problem.

# Import a library - JSON5 or other
I searched for relaxed JSON parser. After reading a couple of stack overflow answers, I found [JSON5](https://json5.org/). It's not the only relaxed JSON parser, but it was available on a CDN and it worked for my purposes. 

# Lesson Learned
Sometimes it's worth it to reinvent the wheel as a learning exercise or to keep your code self contained. Other times it is a better choice to import a library because solving the problem yourself will take more time than it's worth!  

