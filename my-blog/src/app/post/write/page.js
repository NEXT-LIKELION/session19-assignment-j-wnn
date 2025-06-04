'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function WritePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({title, content, author}),
        });
        
        if (res.ok) {
            router.push("/");
        } else {
            console.error("Failed to submit post");
        }
    }

    return (
        <div className="w-full">
            <Button asChild variant="outline" className="mb-8">
                <Link href="/">← 목록으로</Link>
            </Button>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">새 글 작성</CardTitle>
                    <CardDescription>새로운 블로그 글을 작성해주세요.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">제목</Label>
                            <Input id="title" type="text" value={title} placeholder="블로그 글의 제목을 입력하세요 (비워두면 오늘의 고양이 tmi)" onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="author">작성자</Label>
                            <Input id="author" type="text" value={author} placeholder="이름 또는 닉네임 (비워두면 '익명'으로 표시)" onChange={(e) => setAuthor(e.target.value)}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="content">내용</Label>
                            <Textarea id="content" value={content} placeholder="블로그 글의 내용을 마크다운 형식으로 작성할 수 있습니다." onChange={(e) => setContent(e.target.value)} rows={15} required />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t pt-6 flex justify-end">
                        <Button type="submit">게시하기</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}