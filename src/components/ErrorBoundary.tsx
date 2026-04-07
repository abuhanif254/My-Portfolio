import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "An unexpected error occurred. Please try refreshing the page.";
      let errorDetails = null;

      try {
        if (this.state.error?.message) {
          const parsed = JSON.parse(this.state.error.message);
          if (parsed.error && parsed.operationType) {
            errorMessage = `Firestore ${parsed.operationType} error on path: ${parsed.path || 'unknown'}`;
            errorDetails = parsed.error;
          }
        }
      } catch (e) {
        // Not a JSON error, use default or error message
        if (this.state.error?.message) {
          errorMessage = this.state.error.message;
        }
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6 transition-colors">
          <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl p-12 shadow-2xl text-center border border-zinc-100 dark:border-zinc-800">
            <div className="w-20 h-20 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mx-auto mb-8 text-4xl">
              ⚠️
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Something went wrong</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
              {errorMessage}
            </p>
            {errorDetails && (
              <div className="bg-red-50 dark:bg-red-500/5 p-4 rounded-xl mb-8 text-left">
                <p className="text-xs font-mono text-red-600 dark:text-red-400 break-all">
                  {errorDetails}
                </p>
              </div>
            )}
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-zinc-900 dark:bg-brand-500 text-white py-4 rounded-2xl font-bold hover:bg-zinc-800 dark:hover:bg-brand-600 transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
