"use client";
import { storyblokEditable } from "@storyblok/react";

function Buttons({ blok }) {
  const buttons = blok.buttons;

  return (
    <div {...storyblokEditable(blok)} className="buttons-block">
      {buttons?.map((button, key) => (
        <a key={key} href={button.url} className={button.hierarchy}>{button.title}</a>
      ))}
    </div>
  );
}

export default Buttons;
