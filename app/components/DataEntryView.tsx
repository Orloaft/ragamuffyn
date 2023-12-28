import type {
  CharData,
  ItemData,
  LocationData,
  EncounterData,
  CampaignData,
  NPCdata,
} from "~/data";
import IdToEntry from "./IdToEntry";
import { useSelector } from "react-redux";

export default function DataEntryView({ data, type }: any) {
  let dataObj:
    | CharData
    | ItemData
    | LocationData
    | EncounterData
    | CampaignData
    | NPCdata;

  const isLoading = useSelector((state: any) => state.dataObj.loading);

  dataObj = useSelector((state: any) => state.dataObj.dataObj);
  console.log("dataobj:", dataObj);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const renderData = () => {
    switch (type) {
      case "characters":
        return renderCharData(dataObj as CharData);
      case "items":
        return renderItemData(dataObj as ItemData);
      case "locations":
        return renderLocationData(dataObj as LocationData);
      case "encounters":
        return renderEncounterData(dataObj as EncounterData);
      case "campaigns":
        return renderCampaignData(dataObj as CampaignData);
      case "npcs":
        return renderNPCData(dataObj as NPCdata);
      default:
        return <div>Unknown data type</div>;
    }
  };

  const renderCharData = (charData: CharData) => (
    <div>
      <h3>
        {charData.name} (Level {charData.level})
      </h3>
      <p>
        Race: {charData.race}, Class: {charData.class}
      </p>
      <p>Items: {charData.items.join(", ")}</p>
    </div>
  );

  const renderItemData = (itemData: ItemData) => (
    <div>
      <h3>{itemData.name}</h3>
      <p>{itemData.description}</p>
      <p> {itemData.type && `Type:` && itemData.type}</p>
    </div>
  );

  const renderLocationData = (locationData: LocationData) => (
    <div>
      <h3>{locationData.name}</h3>
      <p>{locationData.description}</p>
      <p>
        NPCs:{" "}
        {locationData.npcs.map((n) => (
          <div key={n}>
            <IdToEntry id={n} model="npcs" />
          </div>
        ))}
      </p>
      <p>
        Encounters:{" "}
        {locationData.encounters.map((n) => (
          <div key={n}>
            <IdToEntry id={n} model="encounters" />
          </div>
        ))}
      </p>
    </div>
  );

  const renderEncounterData = (encounterData: EncounterData) => (
    <div>
      <h3>{encounterData.name}</h3>
      <p>{encounterData.description}</p>
      <p>Locations: {encounterData.locations.join(", ")}</p>
      <p>Initiative Order: {encounterData.initiativeOrder.join(", ")}</p>
      <p>Current Turn: {encounterData.currentTurn}</p>
      <p>Round: {encounterData.round}</p>
      <p>Notes: {encounterData.notes.join(", ")}</p>
      <p>NPCs: {encounterData.npcs.join(", ")}</p>
    </div>
  );

  const renderCampaignData = (campaignData: CampaignData) => (
    <div>
      <h3>{campaignData.name}</h3>
      <p>Characters: {campaignData.characters.join(", ")}</p>
      <p>Players: {campaignData.players.join(", ")}</p>
      <p>Encounters: {campaignData.encounters.join(", ")}</p>
      <p>Locations: {campaignData.locations.join(", ")}</p>
      <p>Plot: {campaignData.plot}</p>
    </div>
  );

  const renderNPCData = (npcData: NPCdata) => (
    <div>
      <h3>{npcData.name}</h3>
      <p>Bio: {npcData.bio}</p>
      <p>Character Sheet: {npcData.characterSheet}</p>
      <p>Items: {npcData.items.join(", ")}</p>
    </div>
  );
  return <div>{dataObj && renderData()}</div>;
}
