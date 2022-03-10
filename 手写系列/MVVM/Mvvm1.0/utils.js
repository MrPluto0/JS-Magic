function parsePath(exp) {
  return (obj) => {
    let arr = exp.split(".");
    let val = obj;

    arr.forEach((key) => {
      val = val[key];
    });

    return val;
  };
}
