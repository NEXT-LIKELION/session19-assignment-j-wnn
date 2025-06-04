import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PenSquare, BookOpen, Calendar, User } from "lucide-react";

// 게시글 목록을 가져오는 함수
async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts", { cache: "no-store" });
  const posts = await res.json();
  return posts.map(post => ({ ...post, date: post.date || new Date().toISOString().split('T')[0] }));
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="space-y-8">
      {/* 헤더 섹션 */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white to-gray-300 rounded-3xl mb-6">
          <BookOpen className="h-10 w-10 text-black" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gradient-dark">
          내 블로그에 오신 것을 환영합니다
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          개발과 일상의 이야기를 공유하는 공간입니다
        </p>
        <Button asChild size="lg" className="shadow-dark">
          <Link href="/post/write" className="inline-flex items-center gap-2">
            <PenSquare className="h-5 w-5" />
            새 글 작성하기
          </Link>
        </Button>
      </div>

      <Separator className="my-12" />

      {/* 게시글 목록 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-foreground">최근 게시글</h2>
          <Badge variant="secondary" className="text-sm">
            총 {posts.length}개의 글
          </Badge>
        </div>

        {posts.length === 0 ? (
          <Card className="border-dashed border-2 border-muted bg-muted/20">
            <CardHeader className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-2xl mb-6 mx-auto">
                <PenSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl text-foreground mb-4">아직 작성된 글이 없습니다</CardTitle>
              <CardDescription className="text-lg text-muted-foreground mb-6">
                첫 번째 글을 작성해서 블로그를 시작해보세요!
              </CardDescription>
              <div className="pt-4">
                <Button asChild variant="outline" size="lg">
                  <Link href="/post/write" className="inline-flex items-center gap-2">
                    <PenSquare className="h-5 w-5" />
                    글 작성하기
                  </Link>
                </Button>
              </div>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="group hover:shadow-dark transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary bg-card">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <CardTitle className="text-2xl font-bold hover:text-primary transition-colors line-clamp-2">
                        <Link href={`/post/${post.id}`} className="group-hover:text-primary">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-muted-foreground line-clamp-3 leading-relaxed text-base">
                        {post.content ? (
                          post.content.length > 150 
                            ? post.content.substring(0, 150) + "..." 
                            : post.content
                        ) : "내용이 없습니다."}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="pt-0 border-t border-border">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary hover:bg-primary/10">
                      <Link href={`/post/${post.id}`} className="inline-flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        읽기
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}