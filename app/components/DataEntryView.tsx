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
import { Box, Button } from "@chakra-ui/react";
import { NavLink } from "@remix-run/react";

import { ImageListComponent } from "./images/ImageList";

export default function DataEntryView({ data, type, useStore, id }: any) {
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

  const renderCharData = (charData: CharData) =>
    charData && (
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
        <div>
          Notes
          {charData.notes &&
            charData.notes.map((i) => {
              return <IdToEntry key={i} isList={false} id={i} model="notes" />;
            })}
        </div>
      </div>
    );

  const renderNoteData = (noteData: NoteData) =>
    noteData && (
      <div>
        <h3>{noteData.name || "no name"}</h3>
        <p>{noteData.text}</p>
        <ImageListComponent
          images={noteData.images}
          onChange={false}
          setCellImage={null}
        />
      </div>
    );
  const renderItemData = (itemData: ItemData) => (
    <div>
      <h3>{itemData.name || "no name"}</h3>
      <p>{itemData.description}</p>
      <p> {itemData.type && `Type` && itemData.type}</p>
    </div>
  );

  const renderLocationData = (locationData: LocationData) =>
    locationData && (
      <div>
        <h3>{locationData.name || "no name"}</h3>
        <p>{locationData.description}</p>
        <div>
          NPCs
          {locationData.npcs &&
            locationData.npcs.map((n) => (
              <div key={n}>
                <IdToEntry id={n} model="npcs" isList={true} />
              </div>
            ))}
        </div>
        <div>
          Encounters
          {locationData.encounters &&
            locationData.encounters.map((n) => (
              <div key={n}>
                <IdToEntry id={n} model="encounters" isList={true} />
              </div>
            ))}
        </div>
      </div>
    );

  const renderEncounterData = (encounterData: EncounterData) =>
    encounterData && (
      <div>
        <h3>{encounterData.name || "no name"}</h3>
        <p>{encounterData.description}</p>
        <div>
          Locations
          {encounterData.locations &&
            encounterData.locations.map((i) => {
              return (
                <IdToEntry key={i} id={i} model="locations" isList={true} />
              );
            })}
        </div>

        <div>
          Notes
          {encounterData.notes &&
            encounterData.notes.map((i) => {
              return <IdToEntry key={i} id={i} model="notes" isList={true} />;
            })}
        </div>
        <div>
          NPCs
          {encounterData.npcs &&
            encounterData.npcs.map((i) => {
              return <IdToEntry key={i} id={i} model="npcs" isList={true} />;
            })}
        </div>
        <Button>
          {" "}
          <NavLink to={`/grid/${id}`}>Battle grid</NavLink>
        </Button>
      </div>
    );

  const renderCampaignData = (campaignData: CampaignData) =>
    campaignData && (
      <div>
        <h3>{campaignData.name || "no name"}</h3>
        <div>
          Characters
          {campaignData.characters &&
            campaignData.characters.map((i) => {
              return (
                <IdToEntry key={i} id={i} model="characters" isList={true} />
              );
            })}
        </div>
        <div>
          Players
          {campaignData.players &&
            campaignData.players.map((i) => {
              return <IdToEntry key={i} id={i} model="players" isList={true} />;
            })}
        </div>
        <div>
          Encounters
          {campaignData.encounters &&
            campaignData.encounters.map((i) => {
              return (
                <IdToEntry key={i} id={i} model="encounters" isList={true} />
              );
            })}
        </div>
        <div>
          Locations
          {campaignData.locations &&
            campaignData.locations.map((i) => {
              return (
                <IdToEntry key={i} id={i} model="locations" isList={true} />
              );
            })}
        </div>
        <p>Plot {campaignData.plot}</p>
      </div>
    );

  const renderNPCData = (npcData: NPCdata) =>
    npcData && (
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
            {npcData.items &&
              npcData.items.map((i) => {
                return <IdToEntry key={i} id={i} model="items" isList={true} />;
              })}
          </dd>
        </div>
        <div>
          Notes
          {npcData.notes &&
            npcData.notes.map((i) => {
              return <IdToEntry key={i} isList={false} id={i} model="notes" />;
            })}
        </div>
      </dl>
    );
  return (
    <Box
      background={"black"}
      color="#dddddd"
      className="flow-root"
      borderRadius=".25rem"
      padding="1rem"
    >
      {dataObj && renderData()}
    </Box>
  );
}
