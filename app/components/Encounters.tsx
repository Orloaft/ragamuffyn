export function Encounters(props: { encounters: any[] }) {
  return (
    <div>
      <ul>
        {(props.encounters &&
          props.encounters.map((e: any) => {
            return <li key={e.id}>e.name</li>;
          })) || <span>no encounters</span>}
      </ul>
    </div>
  );
}
