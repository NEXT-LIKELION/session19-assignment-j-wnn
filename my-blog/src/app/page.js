import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// 게시글 목록을 가져오는 함수
async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts", { cache: "no-store" });
  const posts = await res.json();
  return posts.map(post => ({ ...post, date: post.date || new Date().toISOString().split('T')[0] }));
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="w-full">
      <div className="mb-12 flex items-center justify-between">
        <h1 className="text-4xl font-bold">내 블로그</h1>
        <Button asChild>
          <Link href="/post/write">새 글 작성</Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>아직 작성된 글이 없습니다.</CardTitle>
            <CardDescription>첫 번째 글을 작성해보세요!</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <Card key={post.id} className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl hover:underline">
                  <Link href={`/post/${post.id}`}>{post.title}</Link>
                </CardTitle>
                {/* 게시글 내용 미리보기 */}
                <CardDescription className="pt-2">
                  {post.content ? (post.content.substring(0, 150) + (post.content.length > 150 ? "..." : "")) : "내용이 없습니다."}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{post.date}</span>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/post/${post.id}`}>읽기</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}