export default function removeDuplicates(a) {
  const seen = [];
  const buffer = [];
  for (let i = 0; i < a.length; i++) {
    const post = a[i];
    const id = post.id;
    const found = false;
    for (let j = 0; j < seen.length; j++) {
      const seenID = seen[j];
      if (id === seenID) {
        found = true;
      }
    }

    if (!found) {
      seen.push(id);
      buffer.push(post);
    }
  }

  return buffer;
}
