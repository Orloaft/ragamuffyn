import { Box, Text } from "@chakra-ui/react";
import useDataLookUp from "../battleGrid/useDataLookUp";

export default function DmDashboard() {
  const { data: campaignEntries, loading: campaignLoading } = useDataLookUp([
    "0",
  ]);
  let campaignData: any = campaignLoading ? null : campaignEntries;
  console.log(campaignData);
  return (
    <Box>
      {campaignData &&
        campaignData.map((c) => {
          return <Text key={c.id}>{c.name}</Text>;
        })}
    </Box>
  );
}
