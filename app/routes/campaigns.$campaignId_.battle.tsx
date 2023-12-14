import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "~/hooks/useSocket";
import { setRound } from "~/redux/battleDataSlice";

export default function Index() {
  const battleData = useSelector((state: RootState) => state.battleData);
  const dispatch = useDispatch();
  useSocket("http://localhost:8080");
  // Example of dispatching an action
  const updateRound = () => {
    dispatch(setRound(1));
  };

  return (
    <div>
      <h2>Battle Round: {battleData.round}</h2>

      <h3>Initiative Order</h3>
      <ul>
        {battleData.initiativeOrder?.map((entity, index) => (
          <li key={index}>{entity.name}</li>
        ))}
      </ul>

      <h3>Characters</h3>
      <ul>
        {battleData.characters.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>

      <h3>NPCs</h3>
      <ul>
        {battleData.npcs.map((npc) => (
          <li key={npc.id}>{npc.name}</li>
        ))}
      </ul>
      <button onClick={updateRound}>set round</button>
    </div>
  );
}
