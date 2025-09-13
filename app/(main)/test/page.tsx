import React from "react";
import {
  Thread,
  ThreadContent,
  ThreadAction,
  ThreadActions,
} from "@/registry/new-york/thread";

export default function Page() {
  return (
    <div className="flex justify-center mt-10">
      <Thread>
        <ThreadContent>Finding Optimal Solution</ThreadContent>
        <ThreadActions>
          <ThreadAction>this is new action</ThreadAction>
        </ThreadActions>
      </Thread>
    </div>
  );
}
