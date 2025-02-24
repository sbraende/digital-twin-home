function remapValue(value, innStart, innStop, outStart, outStop) {
  value = Number(value);
  innStart = Number(innStart);
  innStop = Number(innStop);
  outStart = Number(outStart);
  outStop = Number(outStop);

  return Number(
    outStart + (outStop - outStart) * ((value - innStart) / (innStop - innStart)).toFixed(4)
  );
}

export { remapValue };
