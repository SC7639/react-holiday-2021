import { Component, ReactNode } from "react";

type Props = {};
type State = { hasError: boolean };

class ErrorBoundary extends Component<Props, State> {
    state = {
        hasError: false,
    };

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
        };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.log(error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
