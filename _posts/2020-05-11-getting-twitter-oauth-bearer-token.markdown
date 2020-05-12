---
layout: post
title: 'How to get the Twitter OAuth 2 bearer token using Node.js'
date: 2020-05-11 16:00:00 -0800
---
Note: There are two types of bearer tokens for twitter. OAuth 1.0 and OAuth 2.0. The OAuth 2.0 token is what you use to make your app take actions on Twitter. The OAuth 1.0 token is what you use to make your app take actions on twitter using credentials provided by your users. This writeup is about the OAuth 2.0 token. 

Twitter documentation 1: [Application-only authentication and OAuth 2.0 Bearer Token](https://developer.twitter.com/en/docs/basics/authentication/api-reference/token)

Twitter documentation 2: [Application-only authentication and OAuth 2.0 Bearer Token](https://developer.twitter.com/en/docs/basics/authentication/oauth-2-0/application-only)

# Sign Up for Twitter
You need to [sign up for twitter](https://twitter.com/signup/), if you haven't already.

# Sign Up for Twitter Developer Account
Then you need to [sign up for a twitter developer account](https://developer.twitter.com/en).
After you sign up, you'll need to verify your account by clicking a link that Twitter will email you. You'll also have to provide a phone number.

# Create an App
Go to the Twitter developer dashboard and [create an app](https://developer.twitter.com/en/apps/create).

# Get the 'Consumer Key' and the Consumer Secret'
Click the 'Details' button for the app.
![Details Button](/assets//images/2020-05-11/detailsButton.png)

Click on 'Keys and Tokens'.
![Keys and Tokens Button](/assets//images/2020-05-11/keysAndTokens.png)

Get the consumer key and consumer secret for the app.
![Key and Secret](/assets//images/2020-05-11/keySecret.png)

# Make a POST request to the Twitter API for the Bearer Token
Make a POST request to the Twitter API for the bearer token. I'm using [node-fetch](https://www.npmjs.com/package/node-fetch), which is a library that lets you run window.fetch in Node.

{% highlight javascript linenos%}
blockName: getBearer
const fetch = require('node-fetch');

const twitterConsumerKey = 'xvz1evFS4wEEPTGEFPHBog';
const twitterConsumerSecret = 'L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg';

//the consumer key 'RFC 1738 encoded'
const rfcKey = encodeURI(twitterConsumerKey);

//the consumer secret 'RFC 1738 encoded'
const rfcSecret = encodeURI(twitterConsumerSecret);

//make the bearer token credential string - 
//the rfc encoded key : the rfc encoded secret
const bearerTokenCredentials = `${rfcKey}:${rfcSecret}`;

//encode the credentials to base 64
const base64BearerTokenCredentials = Buffer.from(
    bearerTokenCredentials
).toString('base64');

//create the options object for node-fetch
const options = {
    headers: {
        accept: 'gzip',
        
        //use your authorization string
        Authorization: 'Basic ' + base64BearerTokenCredentials,

        'content-type': 'application/x-www-form-urlencoded',
    },
    //it's a POST
    method: 'POST',
    body: 'grant_type=client_credentials',
};

const response = await fetch('https://api.twitter.com/oauth2/token', options);

const bearerToken = await response.json();

console.log(JSON.stringify(bearerToken));
{% endhighlight %}

<div class='lineComment' id='{block: getBearer, line: 3 }'
>
Example strings from the Twitter docs
</div>
<div class='lineComment' id='{
    block: getBearer, 
    line: 6 
    }'
    >
The [Twitter documentation](https://developer.twitter.com/en/docs/basics/authentication/oauth-2-0/application-only) says that the key and secret need to be 'RFC 1738 encoded'. [What is RFC 1738 encoding?](https://stackoverflow.com/questions/44774233/encoding-a-string-as-per-rfc-1738-in-nodejs) RFC 1738 encoding [is how URLs are encoded](https://tools.ietf.org/html/rfc1738).
</div>

<div class='lineComment' id='{block: getBearer, line: 7}'>
Use the native [encodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) method to RFC 1738 encode the key and secret.
</div>

<div class='lineComment' id='{block: getBearer, line: 14 }'
>
As the example in the [Twitter documentation](https://developer.twitter.com/en/docs/basics/authentication/oauth-2-0/application-only) shows, the 'Bearer Token credentials' is a string containing the encoded key, a ':', and the encoded secret. 
</div>

<div class='lineComment' id='{block: getBearer, line: 16}'
>
The Bearer Token credentials have to be encoded into base 64 before they are sent as part of the POST request. The answers on [this stackoverflow page](https://stackoverflow.com/questions/6182315/how-to-do-base64-encoding-in-node-js) tell you how to use the native `Buffer` object to encode strings into base64.
</div>

<div class='lineComment' id='{block: getBearer, line: 22 }'
>
The options object for the fetch request. Defines headers, method, and body.
</div>


<div class='lineComment' id='{block: getBearer, line: 24 }'
>
gzip indicates compressed data.
</div>

<div class='lineComment' id='{block: getBearer, line: 27}'
>
The OAuth 2.0 token. You have to have the string `Basic` first.
</div>

<div class='lineComment' id='{block: getBearer, line: 33 }'>
Tells OAuth that your application is request an access token to access its own resources, not on behalf of a user. grant_type parameter must be set to client_credentials.
</div>

<div class='lineComment' id='{block: getBearer, line: 36 }'
>
Fetching is an [asynchronous function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function). Using the `await` keyword means we wait until the promise resolves before assigning the value to the variable.
</div>

<div class='lineComment' id='{block: getBearer, line: 38 }'>
The `json()` method of the response object gives us the content of the response as a JSON object. It's also async, so await it. 
</div>

<div class='lineComment' id='{block: getBearer, line: 40 }'>
Now you have the OAuth2 bearer token for your app.
</div>

Now you have the OAuth2 bearer token for your app! Save it as a string and you can use it to make requests to the Twitter API. Make sure to treat it like a password. Keep it secret and don't upload it to a public file or git repo.

{% include lineCommentsMobile.html %}
{% include formatting.html %}