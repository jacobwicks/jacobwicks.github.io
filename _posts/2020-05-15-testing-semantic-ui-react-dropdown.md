---
layout: post
title: 'How to test a Semantic UI React Dropdown using Jest and React Testing Library'
date: 2020-05-15 16:00:00 -0800
---

<details><summary markdown='span'>Import the components and methods</summary>
{% highlight ts linenos%}
blockName: imports
//React lets us create and display components to the user
//We need to import it so that we can look at the components to test them
import React from 'react';

//testing library gives us methods to test components
//we use render to look at React components
//we use cleanup to clear out memory after tests
import {
    render,
    cleanup,
    fireEvent,
    getAllByRole,
} from '@testing-library/react';

//extend-expect gives us methods that let us say what we think a component will look like when we test it
import '@testing-library/jest-dom/extend-expect';

import { Dropdown } from 'semantic-ui-react';

afterEach(cleanup);
{% endhighlight %}
</details><br/>

<details><summary markdown='span'>Declare the array of dropdown options</summary>
{% highlight ts linenos%}
blockName: options
//grabbed the array of options from the demo code here https://react.semantic-ui.com/modules/dropdown/#types-inline
const options = [
    {
        key: 'Jenny Hess',
        text: 'Jenny Hess',
        value: 'Jenny Hess',
    },
    {
        key: 'Elliot Fu',
        text: 'Elliot Fu',
        value: 'Elliot Fu',
    },
    {
        key: 'Stevie Feliciano',
        text: 'Stevie Feliciano',
        value: 'Stevie Feliciano',
    },
];
{% endhighlight %}
</details><br/>

A Semantic UI React Dropdown using the options array above. Give it a default value of the first option in the array, `Jenny Hess`.

{% highlight ts linenos%}
blockName: MyDropdown
const MyDropdown = () => (
    <Dropdown
        data-testid="dropdown"
        options={options}
        defaultValue={options[0].value}
    />
);
{% endhighlight %}

<div class='lineComment' id='{block: MyDropdown, line: 3}'>
We'll find it using the testid.
</div>

Write the tests:

{% highlight ts linenos%}
blockName: tests
it('runs without crashing', () => {
    render(<MyDropdown />);
});

it('can change the value of the dropdown', () => {
    const { getByTestId } = render(<MyDropdown />);

    const dropdown = getByTestId('dropdown');

    const display = dropdown.children[0];

    expect(display.textContent).toBe(options[0].text);

    console.log(display.textContent);

    fireEvent.click(dropdown);

    const dropdownOptions = getAllByRole(dropdown, 'option');

    fireEvent.click(dropdownOptions[2]);

    expect(display.textContent).toBe(options[2].text);

    console.log(display.textContent);
});
{% endhighlight %}

To change the value of the dropdown from the default value, we'll find the dropdown, click the dropdown to open it, then click on one of the option divs that gets displayed when the dropdown is open.

<div class='lineComment' id='{block: tests, line: 6}'
>
Use `getByTestId` to find the dropdown component in the rendered code. 
Remember: if you want to see the rendered html, grab the debug method as well.

` const { debug, getByTestid } = render(<MyDropdown />);
debug()`
</div>

<div class='lineComment' id='{block: tests, line: 8}'>
A reference to the dropdown component. Its contents are rendered inside it as children elements.
</div>

<div class='lineComment' id='{block: tests, line: 10}'>
The first child div of the dropdown contains the text that it displays. 
</div>

<div class='lineComment' id='{block: tests, line: 12}'
>
It should start out displaying `options[0].text` because we set the default value to `options[0].value`.
</div>

<div class='lineComment' id='{block: tests, line: 16}'
>
Use `fireEvent.click()` to click the dropdown component. This will open it and display the options.
</div>

<div class='lineComment' id='{block: tests, line: 18}'
>
Use `getAllByRole` to find all the dropdwon options. The dropdown options have the role `option`. So this returns an array of all 3 options.
</div>

<div class='lineComment' id='{block: tests, line: 20}'>
Use `fireEvent.click()` to click the third element in the array of dropdown options. 
</div>

<div class='lineComment' id='{block: tests, line: 22}'>
Expect the value to change.
</div>



{% include lineCommentsMobile.html %}
{% include formatting.html %}