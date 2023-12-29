import { MinusIcon, SearchIcon } from "@chakra-ui/icons";
import IdToEntry from "../IdToEntry";
import ModelDataLookUp from "../ModelDataLookUp";
import {
  Divider,
  Flex,
  IconButton,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { DataModalPopUp } from "../DataModalPopUp";

const DataEntryInput: React.FC<any> = (props) => {
  // State for storing the input value

  return (
    <div>
      <label>
        {props.model}
        <Divider />
        <UnorderedList style={{ listStyle: "none" }}>
          {(props.value.length &&
            props.value.map((char: any) => {
              return (
                <ListItem key={char}>
                  <Flex justify={"space-between"}>
                    <IdToEntry isList={true} model={props.model} id={char} />
                    <Flex>
                      <DataModalPopUp
                        data={{ id: char }}
                        button={<SearchIcon />}
                        model={props.model}
                      />

                      <IconButton
                        onClick={() => {
                          props.onChange({
                            target: {
                              name: props.model,
                              value: [...props.value].filter((i) => i !== char),
                            },
                          });
                        }}
                        aria-label="remove"
                        icon={<MinusIcon />}
                      />
                    </Flex>
                  </Flex>
                </ListItem>
              );
            })) || <ListItem>no {props.model}</ListItem>}
        </UnorderedList>

        <ModelDataLookUp
          addToForm={props.onChange}
          addedData={props.value}
          model={props.model}
        />
      </label>
    </div>
  );
};
export default DataEntryInput;
