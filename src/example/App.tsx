import EventComponent from "./EventComponent";

function App() {
  return (
    <EventComponent
      title="Fire event"
      onEmit={(e) => {
        console.log("Event emitted", e);
      }}
    />
  );
}

export default App;
