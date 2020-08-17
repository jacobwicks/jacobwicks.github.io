---
layout: post
title: "Using Redux Toolkit's createReducer with React Context and TypeScript"
date: 2020-08-16 12:00:00 -0800
---
[Example App running on GitHub Pages](https://jacobwicks.github.io/reactContextWithCreateReducer/)

[GitHub Repo for Example Code](https://github.com/jacobwicks/reactContextWithCreateReducer)

I have been using React Context to manage state for my React projects for a while now. The heart of React Context's state management is the reducer, the function that processes actions and returns the new state object. I had been using a switch statement to make the reducer function work. But I found that with a switch statement the files for more complex Contexts were getting too big. The switch statement got bigger and bigger as I added cases to handle all my actions, and my test file for the Context component also got big. So for my latest project I decided to use Redux Toolkit's `createReducer` function. 

# What is createReducer?
`createReducer` is a function that takes all your cases and their individual reducers and creates the main reducer function that you want. [Redux Toolkit](https://redux-toolkit.js.org/) has a nice [`createReducer`](https://redux-toolkit.js.org/api/createReducer) function, and it even works well with TypeScript. Redux Toolkit also comes with the [`createAction`](https://redux-toolkit.js.org/api/createAction) function, which has some nice organizational benefits.

# Why use createReducer?
When you use createReducer to make your context reducer function
-   reducer function is smaller
-   actions are self contained, making testing easy
-   uses Immer library- optional automatic nested state
-   createAction function
-   reference to the action creator function can also be used as the key value instead of using a separate string

**You can Turn this:**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Into this:**
![Big Switch Statement](/assets//images/2020-08-16/bigSwitch.png)

# Example App
I created an **[example app \(linked here\)](https://jacobwicks.github.io/reactContextWithCreateReducer/)** that uses React Context to display pages with lists of questions.

This example app **uses `createReducer` to manage 3 actions**
* **addPage** adds a new page object to the context
* **deletePage** deletes the current page from the context
* **setCurrentPage** sets the current page in the context

The context manages an array of `Page` objects. Each `Page` has two properties. Each Page has a property `number`, which is a number. The number is used to identify pages. Each `Page` has a property `questions`, which is an array of strings.

**Example App Page Objects and the State Object**
{% highlight ts linenos%}
blockName: pagesState
export type Page = {
//the number of the page
number: number;

//the questions that are on the page
questions: string[];
};

export type PagesState = {
current?: number;
pages: Page[];
dispatch: React.Dispatch<PagesAction>;
};
{% endhighlight %}
[View on GitHub](https://github.com/jacobwicks/reactContextWithCreateReducer/blob/master/src/services/PagesContext/index.tsx)

# Install Redux Toolkit
To use **createReducer** and **createAction** you need to install Redux Toolkit.
```
$ npm install @reduxjs/toolkit
```

# createReducer
Here's how you set up the context reducer using `createReducer`.
The example app has three actions. Each of the three actions exports an actionCreator function and a reducer function.
One of the neat tricks that the Redux Toolkit `createAction` lets you do is use a reference to the `actionCreator` function as the key for calling itself.

**Call createReducer**
{% highlight ts linenos%}
blockName: createReducer
export const reducer: Reducer<
  PagesState,
  PagesAction
> = createReducer(initialState, (builder) =>
  builder
    .addCase(addPage, addPageReducer)
    .addCase(deletePage, deletePageReducer)
    .addCase(setCurrentPage, setCurrentPageReducer)
);
{% endhighlight %}
[View on GitHub](https://github.com/jacobwicks/reactContextWithCreateReducer/blob/master/src/services/PagesContext/index.tsx)

<div class='lineComment' id='{block: createReducer, line: 2}'>
The type of the state object that your context manages.
</div>

<div class='lineComment' id='{block: createReducer, line: 3}'>
The type of the action object that your context accepts.
</div>

<div class='lineComment' id='{block: createReducer, line: 6 }'>
Each call to [addCase](https://redux-toolkit.js.org/api/createReducer#builderaddcase) adds a case reducer to handle a single action type. The first argument is normally a string. But when you use [createAction](https://redux-toolkit.js.org/api/createAction) to make your action creators, you can use a reference to the action creator instead of a string. The action creators used here (addPage, deletePage, setCurrentPage) are exported from the action files.
</div>

# Each Action is Self Contained in its Own File
Here's how to structure the action files. Each action file exports the action type, the reducer function, and the action creator function.

**Action with no payload:**
{% highlight ts linenos%}
blockName: deletePage 
import { PagesState } from "../../";
import { PagesActionTypes } from "..";
import { createAction } from "@reduxjs/toolkit";

export type deletePage = {
  type: PagesActionTypes.deletePage;
};

const action = createAction(PagesActionTypes.deletePage);

export const reducer = (state: PagesState) => {
  state.pages = state.pages.filter((p) => p.number !== state.current);
  state.current = undefined;
};

export default action;
{% endhighlight %}
[View on GitHub](https://github.com/jacobwicks/reactContextWithCreateReducer/blob/master/src/services/PagesContext/actions/DeletePage/index.ts)

<div class='lineComment' id='{block: deletePage, line: 9 }'>
This is the action creator. Because there is no payload, you just call `createAction` with the action type as an argument. The action creator returned by `createAction` will be correctly typed because `createAction` reads the action type that you give it. 
</div>

<div class='lineComment' id='{block: deletePage, line: 11 }'>
The reducer function will get called with (state, action). But this reducer doesn't use the action object, so we can leave it out.
</div>

<div class='lineComment' id='{block: deletePage, line: 12 }'>
Redux Toolkit's createReducer function uses the Immer library. Immer lets you use [simplified reducers](https://redux-toolkit.js.org/usage/usage-guide#simplifying-reducers-with-createreducer). Write code that mutates the state directly and createReducer will use Immer to make sure that a new state object is return. Your code is shorter and it gets rid of the chance to make mistakes when creating your nested state return object.
</div>

**Action with primitive payload.** This one uses a number.
{% highlight ts linenos%}
blockName: setCurrentPage
import { PagesState } from "../../";
import { PagesActionTypes } from "..";
import { createAction } from "@reduxjs/toolkit";

export type setCurrentPage = {
  type: PagesActionTypes.setCurrentPage;
  payload: number;
};

const action = createAction<number, PagesActionTypes.setCurrentPage>(
  PagesActionTypes.setCurrentPage
);

export const reducer = (
  state: PagesState,
  { payload }: { payload: number }
) => {
  state.current = payload;
};

export default action;
{% endhighlight %}
[View on GitHub](https://github.com/jacobwicks/reactContextWithCreateReducer/blob/master/src/services/PagesContext/actions/SetCurrentPage/index.ts)

<div class='lineComment' id='{block: setCurrentPage, line: 7 }'>
Define the type of the payload.
</div>

<div class='lineComment' id='{block: setCurrentPage, line: 10 }'>
Type the payload required by your action creator by providing the payload type as the first type parameter, and the action type as the second type parameter.
</div>

<div class='lineComment' id='{block: setCurrentPage, line: 16 }'>
The reducer is called with (state, action). Use object destructuring to get the payload out of the action. 
</div>

<div class='lineComment' id='{block: setCurrentPage, line: 18 }'>
Again, Immer lets you mutate state directly. It feels weird to be mutating the immutable state object, but it's way more efficient.
</div>

**Action with an object payload:**

The imported `hasPage` interface looks like this: 
```
interface hasPage {
  page: Page;
}
```

{% highlight ts linenos%}
blockName: addPage
import { PagesState } from "../../";
import { hasPage, PagesActionTypes } from "..";
import { createAction } from "@reduxjs/toolkit";

export type addPage = {
  type: PagesActionTypes.addPage;
  payload: hasPage;
};

const action = createAction<hasPage, PagesActionTypes.addPage>(
  PagesActionTypes.addPage
);

export const reducer = (
  state: PagesState,
  { payload }: { payload: hasPage }
) => {
  state.pages.push(payload.page);
};

export default action;
{% endhighlight %}
[View on GitHub](https://github.com/jacobwicks/reactContextWithCreateReducer/blob/master/src/services/PagesContext/actions/AddPage/index.ts)

<div class='lineComment' id='{block: addPage, line: 2 }'>
Import the payload interface declaration. You could also declare it inside the action file.
</div>

<div class='lineComment' id='{block: addPage, line: 7 }'>
Typing the payload in the action type declaration.
</div>

<div class='lineComment' id='{block: addPage, line: 10 }'>
Type the payload required by your action creator by providing the payload type as the first type parameter, and the action type as the second type parameter.
</div>

<div class='lineComment' id='{block: addPage, line: 16 }'>
Use object destructuring to get the payload out of the action. The payload will match the interface because calls to the action creator are properly typed throughout the code.
</div>

# The actions Index File
The actions index file is where you declare the enum of all the action types, action payload interfaces, and the union type of all the actions used by this context.

{% highlight ts linenos%}
blockName: actionsIndex
import { addPage } from "./AddPage";
import { deletePage } from "./DeletePage";
import { Page } from "..";
import { setCurrentPage } from "./SetCurrentPage";

//enum containing the action types
export enum PagesActionTypes {
  addPage = "addPage",
  deletePage = "deletePage",
  setCurrentPage = "setCurrentPage",
}

//declare payload interfaces
export interface hasPage {
  page: Page;
}

//union type for all possible actions
export type PagesAction = addPage | deletePage | setCurrentPage;
{% endhighlight %}
[View on GitHub](https://github.com/jacobwicks/reactContextWithCreateReducer/blob/master/src/services/PagesContext/actions/index.ts)

# Using the Actions
You use the actions by calling the action creator with and then dispatching it.

**Dispatching action with no payload:**
{% highlight ts linenos%}
blockName: useDeletePage
import deletePage from "../../services/PagesContext/actions/DeletePage";

const DeletePage = () => {
  const { dispatch } = useContext(PagesContext);

  const handleClick = () => dispatch(deletePage());

  return (
    <button className="btn" onClick={() => handleClick()}>
      <i className="fa fa-trash"></i> Delete Page
    </button>
  );
};
{% endhighlight %}
[View on GitHub](https://github.com/jacobwicks/reactContextWithCreateReducer/blob/master/src/components/DeletePage/index.tsx)

**Dispatching action with primitive payload:**

{% highlight ts linenos%}
blockName: useSetCurrentPage
import setCurrentPage from "../../services/PagesContext/actions/SetCurrentPage";

const Sidebar = () => {
  const { dispatch, current, pages } = useContext(PagesContext);
  return (
    <div className="sidenav">
      <AddPage />
      <br />
      {pages &&
        pages.map((page, index) => (
          <div key={index}>
            <button
              className="btn"
              style={
                current === page.number
                  ? { backgroundColor: "darkblue" }
                  : undefined
              }
              onClick={() => dispatch(setCurrentPage(page.number))}
            >
              Page {page.number} <br />
              {page.questions.length} Question
              {page.questions.length !== 1 ? "s" : ""}
            </button>
          </div>
        ))}
    </div>
  );
};
{% endhighlight %}
[View on GitHub](https://github.com/jacobwicks/reactContextWithCreateReducer/blob/master/src/components/Sidebar/index.tsx)

**Dispatching action with an object payload:**
{% highlight ts linenos%}
blockName: useAddPage
import addPage from "../../services/PagesContext/actions/addPage";

const AddPage = () => {
  const { dispatch, pages } = useContext(PagesContext);

  const handleClick = () => {
    const pageNumber = pages.length ? pages[pages.length - 1].number + 1 : 1;
    const newPage = getPage(pageNumber);
    dispatch(addPage({ page: newPage }));
  };

  return (
    <button className="btn" onClick={() => handleClick()}>
      <i className="fa fa-plus"></i> Add Page
    </button>
  );
};
{% endhighlight %}
[View on GitHub](https://github.com/jacobwicks/reactContextWithCreateReducer/blob/master/src/components/AddPage/index.tsx)

# Testing
Testing the reducer function of each action is simple because each action file exports the individual reducer function. Here's the test for the reducer for `setCurrentPage`. This reducer should accept a 

**Remember:** If you choose to write reducers that mutate state directly, you don't get a return value from them. You should assert that the state object that you passed in has mutated.

{% highlight ts linenos%}
blockName: testing
//import the action creator and the reducer function
import setCurrentPage, { reducer } from "./index";
import { initialState } from "../../../PagesContext";
import getPage from "../../../GetPage";

const page0 = getPage(0);
const page1 = getPage(1);
const page2 = getPage(2);
const page3 = getPage(3);

const stateWithPages = {
  ...initialState,
  current: 1,
  pages: [page0, page1, page2, page3],
};

it("changes the current page", () => {
  const newState = { ...stateWithPages };
  expect(newState.pages.length).toBe(4);
  expect(newState.current).toBe(1);

  //call the action creator
  const action = setCurrentPage(3);

  reducer(newState, action);

  expect(newState.current).toBe(3);
});

{% endhighlight %}
[View on GitHub](https://github.com/jacobwicks/reactContextWithCreateReducer/blob/master/src/services/PagesContext/actions/SetCurrentPage/index.test.ts)
<div class='lineComment' id='{block: testing, line: 25 }'>
The reducer mutates the newState object because we aren't using the Immer library in the testing environment. 
When this reducer is called by the main reducer made using the createReducer function, Immer will be used. So instead of mutating state a new state object will be generated and returned.
</div>

<div class='lineComment' id='{block: testing, line: 27 }'>
Assert that the state object was mutated.
</div>

# That's it!
That's all you need to get started using `createReducer` and `createAction` with React Context. I think it's a really useful tool that simplifies and shortens the code, prevents mistakes, and makes testing easier.

{% include lineCommentsMobile.html %}
