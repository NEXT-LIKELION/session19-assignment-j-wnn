'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PostPage({ params }) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // 게시글 데이터 불러오기
    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch(`/api/posts/${params.id}`, { cache: "no-store" });
                if (res.ok) {
                    const postData = await res.json();
                    setPost(postData);
                } else {
                    setPost(null);
                }
            } catch (error) {
                console.error("게시글을 불러오는데 실패했습니다:", error);
                setPost(null);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [params.id]);

    // 게시글 삭제 처리
    async function handleDelete() {
        if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
            return;
        }

        try {
            const res = await fetch(`/api/posts/${params.id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                alert("게시글이 삭제되었습니다.");
                router.push("/");
            } else {
                alert("게시글 삭제에 실패했습니다.");
            }
        } catch (error) {
            console.error("게시글 삭제 중 오류가 발생했습니다:", error);
            alert("게시글 삭제 중 오류가 발생했습니다.");
        }
    }

    if (loading) {
        return <div className="text-center">게시글을 불러오는 중...</div>;
    }

    if (!post) {
        return (
          <div className="text-center">
            <p className="mb-4 text-lg">글을 찾을 수 없습니다.</p>
            <Button asChild>
              <Link href="/">목록으로</Link>
            </Button>
          </div>
        );
    }

    return (
        <div className="w-full">
            <Button asChild variant="outline" className="mb-8">
                <Link href="/">← 목록으로</Link>
            </Button>
            <Card className="w-full">
                <CardHeader className="border-b">
                    <CardTitle className="text-3xl font-bold mb-2">{post.title}</CardTitle>
                    <CardDescription>작성자: {post.author} {/* Add date here if available: • {post.date} */}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none whitespace-pre-wrap">
                        {post.content}
                    </div>
                </CardContent>
                <div className="p-6 border-t flex gap-2 justify-end">
                    <Button asChild variant="outline">
                        <Link href={`/post/${params.id}/edit`}>수정</Link>
                    </Button>
                    <Button 
                        variant="destructive" 
                        onClick={handleDelete}
                    >
                        삭제
                    </Button>
                </div>
            </Card>
        </div>
    )
}