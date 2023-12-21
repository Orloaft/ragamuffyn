import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

const ModelDataLookUp = ({
  addedData,
  addToForm,
  model,
}: {
  addedData: string[];
  addToForm: any;
  model: string;
}) => {
  const fetcher = useFetcher<any>();
  useEffect(() => {
    fetcher.load(`/${model}`);
  }, []);
  if (fetcher.state === "loading") {
    return <div>Loading {model}...</div>; // Show loading state
  } else if (fetcher.data) {
    let modelData = fetcher.data.data;

    return (
      <div>
        <ul>
          {modelData &&
            modelData.map((char: any) => {
              if (addedData && addedData.find((i: any) => i === char.id)) {
                return null;
              } else {
                return (
                  <li key={char.id}>
                    <button
                      onClick={async (e) => {
                        e.preventDefault();

                        addToForm({
                          target: {
                            name: model,
                            value: [...addedData, char.id],
                          },
                        });
                      }}
                    >
                      {char.name}
                    </button>
                  </li>
                );
              }
            })}{" "}
        </ul>
      </div>
    );
  }
};

export default ModelDataLookUp;
