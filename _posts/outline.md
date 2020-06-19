# Reliably Fetching From the API
# Fetching JSON From the API
authFetchJSON / expectJSON
# Catching Errors

# Logging in With JWT

# API Structure, Using Glob to Grab Route Files

# Control Panel to API Flow using Context to hold state
General flow of requests is
App loads.
Context loads.
Component loads. 
Component gets variables from context. 
Component checks variables.
If variables haven't loaded, and there is no request in progress, and there is no prior successful or failed request, call a function to load the data.
Loading function dispatches an action to the context notifying it of the request.
Loading function makes a request for data from the API.
If the data comes back, loading function dispatches a success action to the context. The success action includes the data to be loaded into the context.
The data is in the context, so the component refreshes and displays the data.
If the data doesn't come back, the loading function dispatches a failure action to the context. Usually the context will set the data to undefined when it receives a failure action.

# The EditableInput React Component
The EditableInput React Component is a component that does 3 things.
1. Displays a value
2. User can click it to change the value using a text input or a checkbox
3. On change, EditableInput takes care of 
* setting the value in the context or local state
* requesting the API to change the value
* if the API request succeeds, dispatching the necessary actions
* if the API request fails, dispatching the necessary actions

# Control Panel to API Flow using Component State 
# Using Server Sent Events to Continously Update Bot Log on the FrontEnd
https://developer.mozilla.org/en-US/docs/Web/API/EventSource
