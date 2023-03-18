const inputSecondary = (e) => {
  const { childNodes } = e.target.parentNode.parentNode.lastElementChild;
  const { value } = e.target;

  childNodes.forEach((child) => {
    const tempChild = child;
    if (!child.value.toLowerCase().includes(value.toLowerCase())) {
      tempChild.classList.remove('show');
      return;
    }
    if (!tempChild.classList.contains('show')) {
      tempChild.classList.add('show');
    }
  });
};

export default inputSecondary;
