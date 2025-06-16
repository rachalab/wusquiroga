"use client";

import  { PropsWithChildren } from 'react';


// Define the component
function SideB (PropsWithChildren)  {
  return (
    <>
      <div>This is your component's text</div>
      {PropsWithChildren.children}
    </>
  );
}

export default SideB;


