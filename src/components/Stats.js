export default function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list.</em>
      </p>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = (numPacked / numItems) * 100;

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go 🛫"
          : `👜You have ${numItems} items on your list, ${
              numPacked > 0
                ? `and you have already packed 
        ${numPacked} items (${Math.round(percentage)}%)`
                : "and you have not packed any item."
            } `}
      </em>
    </footer>
  );
}
