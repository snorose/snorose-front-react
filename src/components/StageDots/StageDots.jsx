export default function StageDots({ quantity, current, size, width, gap }) {
  let dotsArr = [...Array(quantity)].fill(false);
  dotsArr[current - 1] = true;

  const frameStyle = { width: width, height: size, display: 'flex', gap: gap };
  return (
    <div style={frameStyle}>
      {dotsArr.map((isDot, index) => (
        <div
          style={{
            width: size,
            borderRadius: '50%',
            backgroundColor: isDot ? '#00368e' : '#f0f0f0',
          }}
          key={index}
        ></div>
      ))}
    </div>
  );
}
