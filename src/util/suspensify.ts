export type Status = "pending" | "success" | "error";
export interface SuspensifyReturn<T> {
    read: () => T | undefined;
}

const suspensify =
    <T, A extends any[]>(promise: (...args: A) => Promise<T>) =>
    (...args: A): SuspensifyReturn<T> => {
        let status: Status = "pending";
        let result: T;
        let err: Error;

        let suspender = promise(...args).then(
            (r) => {
                status = "success";
                result = r;
            },
            (e) => {
                status = "error";
                err = e;
            }
        );

        return {
            read() {
                if (status === "pending") {
                    throw suspender;
                }

                if (status === "error") {
                    throw err;
                }

                if (status === "success") {
                    return result;
                }
            },
        };
    };

export default suspensify;
