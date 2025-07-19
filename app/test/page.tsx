import React from "react";
import ShadowScrollBar from "@/registry/new-york/shadow-scrollbar/shadow-scrollbar";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="flex w-full justify-center py-10">
      <ShadowScrollBar className="h-[300px] w-[350px]">
        Jokester began sneaking into the castle in the middle of the night and
        leaving jokes all over the place: under the king's pillow, in his soup,
        even in the royal toilet. The king was furious, but he couldn't seem to
        stop Jokester. And then, one day, the people of the kingdom discovered
        that the jokes left by Jokester were so funny that they couldn't help
        but laugh. And once they started laughing, they couldn't stop. Jokester
        began sneaking into the castle in the middle of the night and leaving
        jokes all over the place: under the king's pillow, in his soup, even in
        the royal toilet. The king was furious, but he couldn't seem to stop
        Jokester. And then, one day, the people of the kingdom discovered that
        the jokes left by Jokester were so funny that they couldn't help but
        laugh. And once they started laughing, they couldn't stop.
      </ShadowScrollBar>
    </div>
  );
}
