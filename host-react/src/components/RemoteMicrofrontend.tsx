import { useEffect, useRef } from "react";

function RemoteMicrofrontend() {
  const microfrontendHost = useRef<HTMLDivElement>(null);
  console.log("this renders");
  useEffect(() => {
    const loadComponent = async () => {
      const module = await import("ngMicrofrontendTwo/attachMicrofrontend");
      console.log("module", module);
      module.attachMicrofrontend(microfrontendHost.current);
    };

    loadComponent();
  });

  return <div ref={microfrontendHost}>Loading remote microfrontend...</div>;
}

export default RemoteMicrofrontend;
