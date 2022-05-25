import Counter from "./Counter.svelte";

const mount = (el, props) => {
  new Counter({
    target: el,
    props,
  });
};

export default mount;
