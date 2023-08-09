import React from "react";
import { capitalize } from "./utils";

const EventContext = React.createContext<{
  emitEvent: (eventName: string, eventData: any) => void;
}>({
  emitEvent: () => {},
});

export function useEmitEvent() {
  const { emitEvent } = React.useContext(EventContext);
  return emitEvent;
}

export function withEvents<
  ComponentProps,
  EventNames extends readonly string[]
>(Component: React.FC<ComponentProps>, events: EventNames) {
  type ComponentEventHandlers = {
    [key in `on${Capitalize<EventNames[number]>}`]?: (event: any) => void;
  };

  type ComponentPropsWithEvents = ComponentProps & ComponentEventHandlers;

  return (props: ComponentPropsWithEvents) => {
    const emitEvent = (eventName: EventNames[number], eventData: any) => {
      if (!events.includes(eventName)) {
        console.warn(
          `[@vantezzen/component-events] You emitted event "${eventName}" without declaring it. Please make sure to declare all events in the withEvents() HOC.`
        );
      }

      const handlerName = `on${capitalize(
        eventName
      )}` as keyof ComponentEventHandlers;
      props[handlerName]?.(eventData);
    };

    return (
      <EventContext.Provider value={{ emitEvent }}>
        <Component {...props} />
      </EventContext.Provider>
    );
  };
}
