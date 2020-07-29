In this project I'm using React to review a queue of images. It uses React Context to hold state. So ideally, the components just react to what happens in the state.

We have 6 controls:
Accept Image
Reject Image
Next Image
Last Image
Previous Image
First Image

To give the user some feedback on what happened, I wanted to animate the images.

user clicks thumbs up or down
dispatch accept/reject action to context
(also call to api)
context gets action
context returns state with image status changed

because image status changed, image gets filtered out from filteredqueue

container component around Animated Presence keeps a reference to previous
if status changed, animate up or down
else, animate left or right
old image animates off the screen
new image animates onto the screen

(api call comes back)

The components

# ImageReviewControls

A set of buttons.

-   First image
-   Previous image
-   accept Image
-   Reject Image
-   Next Image
-   Last Image

# AnimatedImage

A function component that accepts an image and a direction. Animates onto the screen and animates out.

# ReviewImage

Component that holds in a grid

-   the info of the user who submitted the image
-   the Animated Image

# User

Users submit the images. The User component Shows users names and avatars.

# ImageReview

The overall container. Holds

-   a Header
-   ImageReviewControls
-   The ReviewImageComponent

# Creating the users, and the image queues

Create the users from random user generator
Create imageQueues from cat api, dog api
