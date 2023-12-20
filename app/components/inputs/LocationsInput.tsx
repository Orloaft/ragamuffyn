import React from "react";

const LocationsInput: React.FC<any> = (props) => {
  // State for storing the input value

  return (
    <div>
      <label>
        Locations:
        <ul>
          {props.value.map((item: any) => {
            return (
              <li key={item}>
                {item}
                <button
                  onClick={() => {
                    props.onChange({
                      target: {
                        name: "locations",
                        value: [...props.value].filter((i) => i !== item),
                      },
                    });
                  }}
                >
                  remove
                </button>
              </li>
            );
          })}
        </ul>
      </label>
    </div>
  );
};

export default LocationsInput;
