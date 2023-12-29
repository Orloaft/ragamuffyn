import { ListItem, UnorderedList } from "@chakra-ui/react";

export function Encounters(props: { encounters: any[] }) {
  return (
    <div>
      <UnorderedList
        backgroundImage={"url('/marble.avif')"}
        style={{ listStyle: "none", padding: "10px" }}
        color="#dddddd"
      >
        {(props.encounters &&
          props.encounters.map((e: any) => {
            return <ListItem key={e.id}>{e.name || "no name"}</ListItem>;
          })) || <span>no encounters</span>}
      </UnorderedList>
    </div>
  );
}
