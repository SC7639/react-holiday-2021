import { useDeferredValue, useState } from "react";

const slowness = 3.5;

const PokemonSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const deferredSearchTerm = useDeferredValue(searchTerm);
    const isStale = searchTerm !== deferredSearchTerm;

    return (
        <div>
            <h2>Search for Pokemon</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={({ currentTarget: { value } }) =>
                    setSearchTerm(value)
                }
            />
            {/* slow */}
            {/* {[...Array(slowness * 5000)].map((key) => (
                <p key={key}>{searchTerm}</p>
            ))} */}
            {/* Fast */}
            <div style={{ opacity: isStale ? 0.2 : 1 }}>
                {[...Array(slowness * 3000)].map((key) => (
                    <p key={key + 4}>{deferredSearchTerm}</p>
                ))}
            </div>
        </div>
    );
};

export default PokemonSearch;
