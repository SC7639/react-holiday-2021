import { FC, createContext } from "react";
import { PokemonResource } from "./actions";
import { SuspensifyReturn } from "./util/suspensify";

export type SuspensePokemonResource = SuspensifyReturn<PokemonResource>;
export const DataContext = createContext<SuspensePokemonResource | null>(null);

export const DataProvider: FC<{ data: SuspensePokemonResource }> = ({
    children,
    data,
}) => <DataContext.Provider value={data}>{children}</DataContext.Provider>;
