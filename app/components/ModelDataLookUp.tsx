import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetcher.load(`/collections/${model}`);
  }, []);
  if (fetcher.state === "loading") {
    return <div>Loading {model}...</div>; // Show loading state
  } else if (fetcher.data) {
    return (
      <div>
        <button
          className="rpgui-button"
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
        >
          Add {model}
        </button>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span
                className="close-button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(false);
                }}
              >
                &times;
              </span>
              {/* Your existing code to render model data */}
              {fetcher.state === "submitting" ? (
                <div>Loading {model}...</div>
              ) : (
                fetcher.data && (
                  <ul className="rpgui-container framed-golden">
                    {fetcher.data.data &&
                      fetcher.data.data.map((char: any) => {
                        if (!addedData || !addedData.includes(char.id)) {
                          return (
                            <li key={char.id}>
                              <button
                                onClick={(e) => {
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
                        return null;
                      })}
                  </ul>
                )
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default ModelDataLookUp;
