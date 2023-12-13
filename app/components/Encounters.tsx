import type { encounter } from "~/components/CampaignView";

export function Encounters(props: { encounters: encounter[] }) {
  return (
    <div>
      <ul>
        {props.encounters.map((e: encounter) => {
          return <li key={e.id}>e.name</li>;
        })}
      </ul>
    </div>
  );
}
