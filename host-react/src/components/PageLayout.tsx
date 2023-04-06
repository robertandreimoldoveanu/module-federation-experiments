import { PropsWithChildren } from "react";

function PageLayout(props: PropsWithChildren<{ title: string }>) {
  return (
    <div className="flex flex-col mt-4">
      <h1>{props.title}</h1>
      <div className="flex flex-row flex-grow">{props.children}</div>
    </div>
  );
}

export default PageLayout;
