"use client";

function Buttons({
  buttons
}) {
  return (
    <div className="buttons-block">
      {buttons?.map((button, key) => (
        <a href={button.url} className={button.hierarchy}>{button.title}</a>
      ))}
    </div>
  );
}

export default Buttons;
