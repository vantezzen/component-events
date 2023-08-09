# @vantezzen/component-events

> Create custom events for your React components

`@vantezzen/component-events` allows you to easily create custom events for your React components, similar to `onClick`, `onMouseEnter` and other events that are built into React.

## Installation

```bash
npm install --save @vantezzen/component-events
```

## Usage

Take a look at `src/example/EventComponent.tsx` for a full example.

```jsx
// EventComponent.tsx
import React from "react";
import { useEmitEvent, withEvents } from "@vantezzen/component-events";

function EventComponent(
   // You can use props like you normally would
   { title }: { title: string }
) {
  const emitEvent = useEmitEvent();

  return (
   <button
      onClick={() => {
         // Use emitEvent to fire event handlers.
         // You can pass any data you want to the event handlers as the second argument
         emitEvent("myEvent", {
            moreInfo: "Hello World",
         });
      }}
   >
      {title}
   </button>
  );
}

// Wrap your component with withEvents to allow it to emit events
export default withEvents(
   EventComponent,

   // Define the events your component can emit as a const array of strings
   ["myEvent"] as const
);

// App.tsx
import EventComponent from "./EventComponent";

function App() {
  return (
    <EventComponent
      // Pass props like you normally would
      title="Fire event"

      // Listen to events by passing a function to the event name
      onMyEvent={(e) => {
        console.log("Event emitted", e);
      }}
    />
  );
}

export default App;
```

### `withEvents`

`withEvents` is a higher-order component that allows your component to emit events. It accepts a functional component as the first argument and an array of event names as the second argument.

The event names are passed as a const array of strings, which allows TypeScript to infer the correct type for the event names.

```tsx
withEvents(
   Component,
   ["myEvent", "myOtherEvent"] as const
)
`
```

The HOC will add `on[CapitalizedEventName]` props to your component, which you can use to listen to events. Adding event listeners is optional.

```tsx
function App() {
  return (
    <Component
      onMyEvent={(e) => {
        console.log("Event emitted", e);
      }}
      onMyOtherEvent={(e) => {
        console.log("Other event emitted", e);
      }}
    />
  );
}
```

### `useEmitEvent`

`useEmitEvent` is a hook that returns a function that allows you to emit events. It accepts the event name as the first argument and the data to pass to the event handlers as the second argument.

```tsx
const emitEvent = useEmitEvent();
emitEvent("myEventName", { moreInfo: "Hello World" });
```

## License

MIT
