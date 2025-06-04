'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function EditPage({ params }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // 기존 게시글 데이터 불러오기
    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch(`/api/posts/${params.id}`);
                if (res.ok) {
                    const post = await res.json();
                    setTitle(post.title);
                    setContent(post.content);
                    setAuthor(post.author);
                }
            } catch (error) {
                console.error("게시글을 불러오는데 실패했습니다:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [params.id]);

    // 게시글 수정 처리
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await fetch(`/api/posts/${params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({title, content, author}),
            });
            
            if (res.ok) {
                router.push(`/post/${params.id}`);
            } else {
                console.error("게시글 수정에 실패했습니다");
            }
        } catch (error) {
            console.error("게시글 수정 중 오류가 발생했습니다:", error);
        }
    }

    if (loading) {
        return <div className="text-center">게시글을 불러오는 중...</div>;
    }

    return (
        <div className="w-full">
            <Button asChild variant="outline" className="mb-8">
                <Link href={`/post/${params.id}`}>← 게시글로 돌아가기</Link>
            </Button>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">게시글 수정</CardTitle>
                    <CardDescription>게시글을 수정해주세요.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">제목</Label>
                            <Input 
                                id="title" 
                                type="text" 
                                value={title} 
                                placeholder="게시글 제목을 입력하세요" 
                                onChange={(e) => setTitle(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="author">작성자</Label>
                            <Input 
                                id="author" 
                                type="text" 
                                value={author} 
                                placeholder="작성자 이름을 입력하세요" 
                                onChange={(e) => setAuthor(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="content">내용</Label>
                            <Textarea 
                                id="content" 
                                value={content} 
                                placeholder="게시글 내용을 입력하세요" 
                                onChange={(e) => setContent(e.target.value)} 
                                rows={15} 
                                required 
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t pt-6 flex justify-between">
                        <Button type="button" variant="outline" asChild>
                            <Link href={`/post/${params.id}`}>취소</Link>
                        </Button>
                        <Button type="submit">수정 완료</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
} 