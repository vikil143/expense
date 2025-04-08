import React from "react";

function withProfiler<P extends object>(
  Component: React.ComponentType<P>,
  id: string
): React.FC<P> {
  if (__DEV__) {
    const Wrapped: React.FC<P> = (props) => {
      return (
        <React.Profiler
          id={id}
          onRender={(id, phase, actualDuration) => {
            console.log(`[${id}] phase: ${phase}, duration: ${actualDuration.toFixed(2)}ms`);
          }}
        >
          <Component {...props} />
        </React.Profiler>
      );
    };

    Wrapped.displayName = `withProfiler(${Component.displayName || Component.name || "Component"})`;
    return Wrapped;
  }

  return (props: P) => <Component {...props} />;
}

export default withProfiler;
