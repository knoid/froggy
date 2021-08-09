export default function translate<
  K extends { new (element: Element): InstanceType<K> }
>(
  parentElement: Element,
  tagName: string,
  ClassConstructor: K
): InstanceType<K>[] {
  const elements = parentElement.getElementsByTagName(tagName);
  return Array.from(elements).map((e) => new ClassConstructor(e));
}
