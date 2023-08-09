import { useEmitEvent, withEvents } from "../main";

function EventComponent({ title }: { title: string }) {
  const emitEvent = useEmitEvent();

  return (
    <div>
      I have events
      <button
        onClick={() => {
          emitEvent("emit", {
            moreInfo: "Hello World",
          });
        }}
      >
        {title}
      </button>
    </div>
  );
}

export default withEvents(EventComponent, ["emit"] as const);
