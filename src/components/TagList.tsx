import Tag from "./Tag";

type Props = {
  tags: string[];
};

export default function TagList({ tags }: Props) {
  if (!tags) return null;

  return (
    <div>
      {tags.map((tag: string) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  );
}
