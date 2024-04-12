import { RenderingInfo } from '@/app/ui/rendering-info';

export default async function Page() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
    cache: 'force-cache',
  });
  const data = (await res.json()) as { title: string; body: string };

  return (
    <div>
      <div>Dynamic Data</div>
      <div>{data.body}</div>
      <div>
        <RenderingInfo />
      </div>
    </div>
  );
}
