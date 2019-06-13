export default checkout => {
  checkout.on("@init", () => ({
    checkout: {
      route: "shipping",
      dirty: false,
      completed: false
    }
  }));
};
