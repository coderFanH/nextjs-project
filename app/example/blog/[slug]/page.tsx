export default function Page({ params }: { params: { slug: string } }) {
  return <div>Blog post: {params.slug}</div>;
}
