import { Box } from "@chakra-ui/react";
import DmDashboard from "./DmDashboard";
import PlayerDashboard from "./PlayerDashboard";

export default function Dashboard({ role }) {
  return <Box>{role === "dm" ? <DmDashboard /> : <PlayerDashboard />}</Box>;
}
