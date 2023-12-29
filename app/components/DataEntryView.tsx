import type {
  CharData,
  ItemData,
  LocationData,
  EncounterData,
  CampaignData,
  NPCdata,
  NoteData,
} from "~/data";
import IdToEntry from "./IdToEntry";
import { useSelector } from "react-redux";

export default function DataEntryView({ data, type, useStore }: any) {
  let dataObj:
    | CharData
    | ItemData
    | LocationData
    | EncounterData
    | CampaignData
    | NPCdata
    | NoteData;

  const isLoading = useSelector((state: any) => state.dataObj.loading);
  const storeObj = useSelector((state: any) => state.dataObj.dataObj);
  dataObj = useStore ? storeObj : data;

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
      case "notes":
        return renderNoteData(dataObj as NoteData);
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
        Race {charData.race}, Class: {charData.class}
      </p>
      <div>
        Items
        {charData.items &&
          charData.items.map((i) => {
            return <IdToEntry key={i} isList={true} id={i} model="items" />;
          })}
      </div>
    </div>
  );

  const renderNoteData = (noteData: NoteData) => (
    <div>
      <h3>{noteData.name || "no name"}</h3>
      <p>{noteData.text}</p>
    </div>
  );
  const renderItemData = (itemData: ItemData) => (
    <div>
      <h3>{itemData.name || "no name"}</h3>
      <p>{itemData.description}</p>
      <p> {itemData.type && `Type` && itemData.type}</p>
    </div>
  );

  const renderLocationData = (locationData: LocationData) => (
    <div>
      <h3>{locationData.name || "no name"}</h3>
      <p>{locationData.description}</p>
      <div>
        NPCs
        {locationData.npcs.map((n) => (
          <div key={n}>
            <IdToEntry id={n} model="npcs" isList={true} />
          </div>
        ))}
      </div>
      <div>
        Encounters
        {locationData.encounters.map((n) => (
          <div key={n}>
            <IdToEntry id={n} model="encounters" isList={true} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderEncounterData = (encounterData: EncounterData) => (
    <div>
      <h3>{encounterData.name || "no name"}</h3>
      <p>{encounterData.description}</p>
      <div>
        Locations
        {encounterData.locations.map((i) => {
          return <IdToEntry key={i} id={i} model="locations" isList={true} />;
        })}
      </div>
      <p>Initiative Order {encounterData.initiativeOrder.join(", ")}</p>
      <p>Current Turn {encounterData.currentTurn}</p>
      <p>Round {encounterData.round}</p>
      <div>
        Notes
        {encounterData.notes.map((i) => {
          return <IdToEntry key={i} id={i} model="notes" isList={true} />;
        })}
      </div>
      <div>
        NPCs
        {encounterData.npcs.map((i) => {
          return <IdToEntry key={i} id={i} model="npcs" isList={true} />;
        })}
      </div>
    </div>
  );

  const renderCampaignData = (campaignData: CampaignData) => (
    <div>
      <h3>{campaignData.name || "no name"}</h3>
      <div>
        Characters
        {campaignData.characters.map((i) => {
          return <IdToEntry key={i} id={i} model="characters" isList={true} />;
        })}
      </div>
      <div>
        Players
        {campaignData.players.map((i) => {
          return <IdToEntry key={i} id={i} model="players" isList={true} />;
        })}
      </div>
      <div>
        Encounters
        {campaignData.encounters.map((i) => {
          return <IdToEntry key={i} id={i} model="encounters" isList={true} />;
        })}
      </div>
      <div>
        Locations
        {campaignData.locations.map((i) => {
          return <IdToEntry key={i} id={i} model="locations" isList={true} />;
        })}
      </div>
      <p>Plot {campaignData.plot}</p>
    </div>
  );

  const renderNPCData = (npcData: NPCdata) => (
    <dl className="-my-3 divide-y divide-gray-100 text-sm">
      <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
        <dt className="font-medium text-gray-900">Name</dt>
        <dd className="text-gray-700 sm:col-span-2">
          {npcData.name || "no name"}
        </dd>{" "}
      </div>
      <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
        <dt className="font-medium text-gray-900">bio</dt>
        <dd className="text-gray-700 sm:col-span-2">{npcData.bio}</dd>
      </div>
      <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
        <dt className="font-medium text-gray-900">Items</dt>
        <dd className="text-gray-700 sm:col-span-2">
          {npcData.items.map((i) => {
            return <IdToEntry key={i} id={i} model="items" isList={true} />;
          })}
        </dd>
      </div>
    </dl>
  );
  return <div className="flow-root">{dataObj && renderData()}</div>;
}
