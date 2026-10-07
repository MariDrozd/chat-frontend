import { Component, type ErrorInfo, type ReactNode } from "react"


type Props = {
	children: ReactNode;
	fallback?: (args: {
		error: Error,
		reset: () => void
	}) => ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

type State = {
	error: Error | null;
};


export class ErrorBoundary extends Component<Props, State>{
	state: State = { error: null };

	static getDerivedStateFromError(error: Error): State {
		return { error };
	};

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		this.props.onError?.(error, errorInfo);
	};

	reset = () => {
		this.setState({ error: null });
	};

	render() {
		const { error } = this.state;

		if (error) {
			if (this.props.fallback) {
				return this.props.fallback({error, reset: this.reset})
			}
			return (
				<div className="p-[16px]">
					<h2>Error!</h2>
					<div className="mt-[8px] mb-[12px]">{error.message}</div>
					<button onClick={this.reset}>Try again</button>
					<button onClick={() => window.location.reload()} className="ml-[8px]">Reload page</button>
				</div>
			)
		}

		return this.props.children
	}
}