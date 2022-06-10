import Example from "./Example.svelte";

const mount = (el, props) => {
  new Example({
    target: el,
    props,
  });
};

export { mount };
