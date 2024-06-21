import React from "react";
import {
  NodeHandler,
  NodeHandlers,
  TipTapRender,
} from "@troop.com/tiptap-react-render";

const paragraph: NodeHandler = (props) => {
  return <p>{props.children}</p>;
};

const doc: NodeHandler = (props) => {
  return <>{props.children}</>;
};

const text: NodeHandler = (props) => {
  return <span>{props.node.text}</span>;
};

const handlers: NodeHandlers = {
  paragraph,
  doc,
  text,
};

function RenderToJson({ data }: { data: any }) {
  return (
    <div className=" px-3 prose dark:prose-invert">
      <TipTapRender handlers={handlers} node={data ? data : ""} />
    </div>
  );
}

export default RenderToJson;
