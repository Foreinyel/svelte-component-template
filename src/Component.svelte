<script>
  export let onClick;
</script>

<button
  class="footer"
  on:click={() => {
    if (onClick) {
      onClick();
    }
  }}>Counter</button
>

<style>
  .footer {
    background-color: #aaa;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
