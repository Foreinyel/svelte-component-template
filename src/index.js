import Component from "./Component.svelte";

const mount = (el, props) => {
  new Component({
    target: el,
    props,
  });
};

export default Component;

export { mount };

