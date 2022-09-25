function updateHandler(el, binding) {
  el.removeEventListener("input", handlers.get(el));

  const childInput = el.querySelector("input");
  const handler = () => {
    const value = childInput.value.replace(/\D/g, "").slice(0, binding.value);
    if (value !== childInput.value) {
      childInput.value = value;
      childInput.dispatchEvent(new Event("input"));
    }
  };
  handler();
  handlers.set(childInput, handler);

  el.addEventListener("input", handler);
}