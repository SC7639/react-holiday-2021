import { Dispatch, FC, SetStateAction, TransitionStartFunction } from "react";
import { fetchPokemon, PokemonResource, getPokemon } from "./actions";
import { SuspensifyReturn } from "./util/suspensify";

type Props = {
    // startTransition: TransitionStartFunction;
    // setPokemonResource: Dispatch<
    //     SetStateAction<SuspensifyReturn<PokemonResource>>
    // >;
    // setPokemon: (resource: SuspensifyReturn<PokemonResource>) => void;
    // id: number;
    onClick: () => void;
};

const NextPokemonButton: FC<Props> = ({
    // startTransition,
    // setPokemonResource,
    // setPokemon,
    // id,
    onClick,
}) => (
    <button
        onClick={onClick}
        // onClick={() =>
        //     // setPokemonResource(
        //     // suspenseFetchPokemon((pokemon?.id || 0) + 1)
        //     // )

        //     // Wrap the above state update in a transition to see what React does
        //     // Instead of flashing no content, it will continue to show the previous view until the next view resolves

        //     // reactStartTransition(() =>
        //     //     setPokemonResource(
        //     //         suspenseFetchPokemon((pokemon?.id || 0) + 1)
        //     //     )
        //     // )

        //     // This option uses useTransition.
        //     // useTransition is like startTransition@level2.
        //     // instead of returning just the transition function, it returns a tuple.
        //     // The first value in that tuple the state of the transition. the second is the same startTransition function
        //     // startTransition(() =>
        //     //     setPokemonResource(suspenseFetchPokemon(id + 1))
        //     // )

        //     // setPokemon(getPokemon(id + 1))
        // }
    >
        Next
    </button>
);

export default NextPokemonButton;
