---
layout: post
title:  "Comments on Code Line Numbers in Jekyll"
date:   2020-02-19 12:00:00 -0800
---

When I write a blog post about my code, I want to write information that is detailed enough that beginners won't get lost. Because a single line or block of code can include many different operations, it can be difficult to present the whole function, the specific code you are talking about, and the explanation for what the code is doing. So I decided to make it possible to float comment boxes next to specific lines of code. That way the explanation is clearly visually connected to the code that is being explained. 

Here's a block of code with line numbers and a comment pointing to line 7:

{% highlight javascript linenos %}
//takes an element and returns the top offset property
//the distance from the top of the screen in pixels
//calculates by recursively adding the top offset of each parent element
const getOffsetTop = element => {
    let offsetTop = 0;
    while (element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
    }
    return offsetTop;
};
{% endhighlight %}

<div class = "lineComment" id="block.0.line.9">
This is the code inside the while loop. It will execute as long as the variable `element` returns a truthy value. += is the addition assignment operator. Here, it is adding the value of the offSetTop property of the current element to the value of the variable named offsetTop.
</div>

Excellent, right? Want to know how it works?

## How it Works
When you type a code snippet in a Jekyll post, you can tell Jekyll to highlight the code snipped using [Liquid Tags](https://jekyllrb.com/docs/liquid/tags/). Liquid Tags are inside curly brackets and percent signs. The starting and ending Liquid Tags for highlighting JavaScript look like this:

{% raw %} 
{% highlight javascript %} <br/>
const helloWorld = () => console.log('Hello World!'); <br/>
{% endhighlight %}
{% endraw %}

That will render on the page as this:
{% highlight javascript %} const helloWorld = () => console.log('Hello World!'); 
{% endhighlight %}

To add line numbers, you add 'linenos' to the opening tag:
{% raw %} 
{% highlight javascript linenos %}
{% endraw %}

That will render on the page as this:
{% highlight javascript linenos %} const helloWorld = () => console.log('Hello World!'); 
{% endhighlight %}

If you inspect the page<br/><br/>
![inspecting the lineno element](/assets//images/lineno.png)


<!-- {% include lineComments.html %} -->
