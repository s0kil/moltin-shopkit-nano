const css = properties => {
  for (const property in properties) {
    document.documentElement.style.setProperty(
      `--${property}`,
      properties[property]
    );
  }
};

export default css;
