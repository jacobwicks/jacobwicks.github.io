---
layout: post
title: 'Rendering markdown and resizing images with React-Markdown'
date: 2020-06-19 12:00:00 -0800
---

This post will show you how to render markdown in a React app and automatically resize images in the markdown. It uses [TypeScript](https://www.typescriptlang.org/), [react-markdown](https://www.npmjs.com/package/react-markdown), and [React Hooks](https://reactjs.org/docs/hooks-intro.html). 

The git repo is here: [https://github.com/jacobwicks/markdownreact]

Credit to "mrm007" who wrote this post on how to make a custom image renderer for react-markdown: [https://github.com/rexxars/react-markdown/issues/384#issuecomment-577917355]

Credit to "Marco Antônio" and "Jeffrey Terry" who wrote this stackOverflow answer on how to get the width of a react element [https://stackoverflow.com/questions/43817118/how-to-get-the-width-of-a-react-element/59989768#59989768]

# Starting the new project

1. Create a new react app

```
$ npx create-react-app markdown --template typescript
```

Navigate to the folder of the new react app you just created 

2. Install React-Markdown

```
$npm i react-markdown
```

# Write a markdown file

React-Markdown reads markdown files and lets you easily display them as react components. So let's write an example markdown file.

Create a new markdown file `src/catInstructions.md`. Copy and paste the content below into it. This content has a picture of a cat that is 700 pixels wide.

```
# To Get the Cat Api Key

1. Go to the cat api website and sign up

<a href="https://thecatapi.com/signup" target="_blank">Sign Up Here on the Cat Api Website</a>

![A medium cat image](https://cdn2.thecatapi.com/images/9qLSHCaQQ.jpg)

2. You will get an email with the key in it.

3. Copy the key from your email into the field on this page
```


# Rewrite App.tsx

Replace the App.tsx component with this container div.

{% highlight ts linenos%}
blockName: app
function App() {
    return (
        <div
            style={{
                border: 'solid',
                borderRadius: 15,
                marginLeft: 100,
                marginTop: 50,
                width: 500,
            }}
        >
            Hello World
        </div>
    );
}
{% endhighlight %}

<div class='lineComment' id='{block: app, line: 9 }'>
The div has a fixed width of 500. This is narrower than the cat image in the markdown, which is 700 pixels wide.
</div>

The div will look like this:

![Div with Hello World](/assets//images/2020-06-19/helloWorld.png)

# Change the imports in App.tsx
We are going to use the React [`useState` hook](https://reactjs.org/docs/hooks-state.html) and the [`useEffect` hook](https://reactjs.org/docs/hooks-effect.html), so import those. Also import `ReactMarkdown`.

{% highlight ts linenos%}
blockName: imports1
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
{% endhighlight %}

<div class='lineComment' id='{block: imports1 , line: 2}'>
We use HTML in our markdown file, so we are importing ReactMarkdown with the html parser turned on. If we weren't using HTML we could just import it from 'react-markdown'.
</div>

# Write the ExampleMarkdown component

We're going to create a new component called `ExampleMarkdown` inside of App.tsx. We'll put this component above the `App` component. `ExampleMarkdown` will load the markdown from the `catInstructions.md` file that we wrote earlier. `ExampleMarkdown` will then display the markdown on screen.

{% highlight ts linenos%}
blockName: exampleMarkdown
const ExampleMarkdown = () => {
    const [input, setInput] = useState('');

    const getInput = async () => {
        const instructionsPath = require('./catInstructions.md');

        try {
            const instructionsFile = await fetch(instructionsPath);

            const instructionsText = await instructionsFile.text();
            
            setInput(instructionsText);
        } catch (err) {
            console.error('Problem reading markdown file', err);
        }
    };

    useEffect(() => {
        getInput();
    }, [getInput]);

    return <ReactMarkdown 
            escapeHtml={false} 
            source={input} 
          />;
};
{% endhighlight %}

<div class='lineComment' id='{block: exampleMarkdown, line: 2}'>
We use the `useState` hook to hold the input string that the `ReactMarkdown` component will render.
</div>

<div class='lineComment' id='{block: exampleMarkdown, line: 4}'>
The getInput is an async function. We use the await command to wait for asnychronous operations to complete before using their results for the next step.  
</div>

<div class='lineComment' id='{block: exampleMarkdown, line: 6 }'>
This is the relative path of the .md file that we are fetching. In practice, you might be getting the .md file from a different folder, or from an api request. 
</div>

<div class='lineComment' id='{block: exampleMarkdown, line: 8 }'>
Wait for [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to get the contents of the file.
</div>

<div class='lineComment' id='{block: exampleMarkdown, line: 10 }'>
The .text() method of a fetch Response gives us the response as a string. It is asynchronous, so we use the `await` command to wait for it to finish. The variable `instructionsText` is a string with the same content as the `catInstructions.md` file that we wrote earlier.  
</div>

<div class='lineComment' id='{block: exampleMarkdown, line: 12 }'>
Set the input equal to the `instructionsText` string.
</div>

<div class='lineComment' id='{block: exampleMarkdown, line: 18 }'>
This `useEffect` hook will run once when the component mounts. It will call the `getInput` function to load the markdown file into the `input` `useState` hook.  `useEffect` hooks actually run every time the value of one of its dependencies changes. But the only dependency of this `useEffect` hook is the function `getInput`. The value of `getInput` won't change, so the hook will only run once. 
</div>

<div class='lineComment' id='{block: exampleMarkdown, line: 22 }'>
The `ReactMarkdown` component parses the markdown and renders it on the screen.
</div>

<div class='lineComment' id='{block: exampleMarkdown, line: 23 }'>
We have HTML in our markdown that we want to render, so we set `escapeHtml={false}`
</div>

<div class='lineComment' id='{block: exampleMarkdown, line: 24 }'>
The source for the markdown is the value of the `input` `useState` hook.
</div>

# Add ExampleMarkdown to App

{% highlight ts linenos%}
blockName: 
function App() {
    return (
        <div
            style={{
                border: 'solid',
                borderRadius: 15,
                marginLeft: 100,
                marginTop: 50,
                width: 500,
            }}
        >
            <ExampleMarkdown/>
        </div>
    );
}
{% endhighlight %}

Ok, now it runs. And it's reading and rendering our markdown file. Great! But oh no! The cat is wider than the div!

![Wide Cat](/assets//images/2020-06-19/wideCat.png)

# How do we fix this?
React-Markdown doesn't provide a setting for automatically resizing images yet. It might be added sometime in the future. React-Markdown also doesn't support the normal markdown syntax for limiting image width yet.

```
Usually in markdown you can limit image dimensions like this: 

Limit width to 100 and height to 200
![](./pic/pic1_50.png =100x200)

Limit just width to 250
![](./pic/pic1s.png =250x)
```

But React-Markdown does let you write your own functions to display each type of node that it generates. So we can write our own `renderer` function for image nodes and pass that to the `ReactMarkdown` component. Our custom render function will limit the max width of images. Then when `ReactMarkdown` finds an image, it will send that image to our function, and the image width will be limited like we want.

# Add Custom Renderer to ExampleMarkdown
Write this custom render function inside of the `ExampleMarkdown` component. Our container div is 500 pixels wide, so we'll set the max width of the images to be 475 pixels. Pass the renderers object that contains our custom image function to `ReactMarkdown`.

{% highlight ts linenos%}
blockName: imageRenderer
    //ReactMarkdown accepts custom renderers
    const renderers = {
        //This custom renderer changes how images are rendered
        //we use it to constrain the max width of an image to its container
        image: ({
            alt,
            src,
            title,
        }: {
            alt?: string;
            src?: string;
            title?: string;
        }) => (
            <img 
                alt={alt} 
                src={src} 
                title={title} 
                style={{ maxWidth: 475 }} />
        ),
    };

    return (
        <ReactMarkdown
            escapeHtml={false}
            source={input}
            renderers={renderers}
        />
    );
{% endhighlight %}

<div class='lineComment' id='{block: imageRenderer, line: 18 }'>
The width of the images is limited to 475 pixels.
</div>

Run it, and you'll see the cat now fits in the box!
![Cat Fits](/assets//images/2020-06-19/catFits.png)

That's great. And it works because we know that the div is 500 pixels wide, so a picture 475 pixels wide will fit. But it's pretty common to use elements that don't have a fixed size, and change based on how big the screen is. Would that cause any problems?

# Change the Container Div to Resize with The Screen
Change width from 500 pixels to 50 vw. This will make the div width half of the width of the browser window.

{% highlight ts linenos%}
blockName: divWithVw
function App() {
    return (
        <div
            style={{
                border: 'solid',
                borderRadius: 15,
                marginLeft: 100,
                marginTop: 50,
                width: '50vw',
            }}
        >
            <ExampleMarkdown />
        </div>
    );
}
{% endhighlight %}

<div class='lineComment' id='{block: divWithVw, line: 9 }'>
50 vw means 50% of the screen width. This is one of many ways of making elements resize with the screen. 
</div>

Ok, now the cat still fits. But play with changing the size of the browser window and see what happens.
![Still Fits](/assets//images/2020-06-19/stillFits.png)

When you change the size of the browser window the size of the container div will change. But your cat stays the same width! Eventually your div will be too skinny for the cat.

![Too Skinny](/assets//images/2020-06-19/tooSkinny.png)

That doesn't look good. How can we fix this problem?

# Find the Width of the Div and Change the Max Width of the Image

Add the React [`useRef`](https://reactjs.org/docs/hooks-reference.html#useref) and [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback) hooks to the imports. 

`useRef` gives us a way to generate a `ref` to our div component. This will let us keep track of when the div changes size. If you are really curious about what a ref is, the React docs explain it here: [https://reactjs.org/docs/refs-and-the-dom.html] 

`useCallback` wraps a function and makes sure the function only runs if it needs to. When you call functions from inside hooks, you'll end up using `useCallback` to stop the hooks from running too often and causing problems.

{% highlight ts linenos%}
blockName: imports2
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
{% endhighlight %}

Write the `useResize` function. This function takes a ref as a prop, and returns the width. It also listens for when the window resize event fires and updates the width every time the ref size changes.

{% highlight ts linenos%}
blockName: useResize
const useResize = (myRef: React.RefObject<HTMLDivElement>) => {
    const getWidth = useCallback(() => myRef?.current?.offsetWidth, [myRef]);

    const [width, setWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        const handleResize = () => {
            setWidth(getWidth());
        };

        if (myRef.current) {
            setWidth(getWidth());
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [myRef, getWidth]);

    return width && width > 25 ? width - 25 : width;
};
{% endhighlight %}

<div class='lineComment' id='{block: useResize, line: 1 }'>
`useResize` takes a ref to a div element as a prop. If you reuse this code for another kind of element, you'll have to change the type of the RefObject.
</div>

<div class='lineComment' id='{block: useResize, line:2 }'>
`getWidth` returns the width of the current value of the ref. 

`getWidth` looks at the [offsetWidth](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth) of the element. 

The question marks are [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining). This lets us try to access properties of an object that may be undefined without throwing an error.

`getWidth` is wrapped in `useCallback`. Try removing the `useCallback` wrapper like this:
```
const getWidth = () => myRef?.current?.offsetWidth
```
React will still run it, but will give you an error.
</div>

<div class='lineComment' id='{block: useResize, line:4 }'>
`width` is either a number or undefined. We use the `useState` hook to store the value of `width`. `useState` returns an array. The brackets are [array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).
</div>

<div class='lineComment' id='{block: useResize, line:6 }'>
`useEffect` hooks will run whenever the value of one of their dependencies changes. This hook will run whenever the value of `myRef` changes. This hook will also run whenever the value of the `getWidth` function changes.
</div>

<div class='lineComment' id='{block: useResize, line: 7 }'>
We call `handleResize` whenever the window is resized. We get the current width of the ref, and store the value in `width`.
</div>

<div class='lineComment' id='{block: useResize, line: 11 }'>
The `current` property of a ref is the element that the ref is pointed at. In our app, the ref starts out as `null` and then changes to hold the container div. When that change happens, `myRef.current` is true, and this line will set the starting value of the width. If you comment this out, then your image won't resize when you first start the app.
</div>

<div class='lineComment' id='{block: useResize, line: 15}'>
Here we attach an [eventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) to the [window object](https://developer.mozilla.org/en-US/docs/Web/API/Window). Whenever a 'resize' event happens, we'll call the `handleResize` function.
</div>

<div class='lineComment' id='{block: useResize, line: 17}'>
The return function of a `useEffect` hook is called when the hook is unmounted. This function just removes the event listener. If you add an event listener to the window and don't remove it when you are done, the event listener will keep firing even when the component that was using it is gone. 

This example app doesn't have a way to unmount the component that calls the hook, so this is just here to show you how to do it.
</div>

<div class='lineComment' id='{block: useResize, line:20 }'>
The 'depenencies' of the `useEffect` hook. Every variable from outside a `useEffect` hook is one of its dependencies. You should include those dependencies in the dependency array.
</div>

<div class='lineComment' id='{block: useResize, line: 22 }'>
If width is defined and is greater than 25, return width -25. We subtract 25 because we want our images to be smaller than the div, not the same size. If with is undefined or is less than 25, return the value of width unmodified.
</div>

Add a ref to the div. Passing the ref to the `useResize` function will let us keep track of how wide the div is. In the final step, we'll pass the `maxWidth` variable to `ExampleMarkdown` and use it to set the width of the image. Right now we are just logging `maxWidth` to the console so you can see it change when you resize the screen.

{% highlight ts linenos%}
blockName: addedRefToDiv
function App() {
    const divRef = useRef<HTMLDivElement>(null);
    const maxWidth = useResize(divRef);

    console.log('max width is', maxWidth);
    return (
        <div
            ref={divRef}
            style={{
                border: 'solid',
                borderRadius: 15,
                marginLeft: 100,
                marginTop: 50,
                width: '50vw',
            }}
        >
            <ExampleMarkdown />
        </div>
    );
}
{% endhighlight %}

Resize the window and you'll see that the `useResize` function returns the updated `maxWidth` value.
![Log Width](/assets//images/2020-06-19/logWidth.png)

# Make the Image Renderer use Variable maxWidth
The last step is to pass the `maxWidth` into the image renderer function that we wrote earlier.
Make the `ExampleMarkdown` component take a `maxWidth` prop.

{% highlight ts %}
const ExampleMarkdown = ({ maxWidth }: { maxWidth?: number }) => {
{% endhighlight %}

And change the image renderer from using a static width of 475

{% highlight ts %}        
    }) => <img alt={alt} src={src} title={title} style={{ maxWidth: 475 }} />,
{% endhighlight %}

to using the variable `maxWidth`

{% highlight ts %}
        }) => <img alt={alt} src={src} title={title} style={{ maxWidth }} />,
{% endhighlight %}

Finally, change the `App` to pass `maxWidth` into `ExampleMarkdown`.

{% highlight ts linenos%}
blockName: finalApp
function App() {
    const divRef = useRef<HTMLDivElement>(null);
    const maxWidth = useResize(divRef);

    return (
        <div
            ref={divRef}
            style={{
                border: 'solid',
                borderRadius: 15,
                marginLeft: 100,
                marginTop: 50,
                width: '80vh',
            }}
        >
            <ExampleMarkdown maxWidth={maxWidth} />
        </div>
    );
}
{% endhighlight %}

Now your image will resize with the container div!

![resize](/assets//images/2020-06-19/resize.gif)

{% include lineCommentsMobile.html %}
{% include formatting.html %}