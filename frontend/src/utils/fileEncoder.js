export default (file, readAsText = true) => new Promise((resolve) => {
  const reader = new FileReader();
  reader.onload = resolve;
  if (readAsText) {
    reader.readAsText(file);
    return;
  }
  reader.readAsDataURL(file);
});
