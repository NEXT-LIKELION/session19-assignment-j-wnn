'use client'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Edit3, Trash2 } from "lucide-react";

export default function PostActions({ postId }) {
    const router = useRouter();

    // 게시글 삭제 처리
    async function handleDelete() {
        if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
            return;
        }

        try {
            const res = await fetch(`/api/posts/${postId}`, {
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

    return (
        <div className="border-t border-border bg-muted/20">
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        게시글 관리
                    </div>
                    <div className="flex items-center gap-3">
                        <Button asChild variant="outline" size="sm" className="hover:bg-primary/10 border-border text-foreground">
                            <Link href={`/post/${postId}/edit`} className="inline-flex items-center gap-2">
                                <Edit3 className="h-4 w-4" />
                                수정
                            </Link>
                        </Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={handleDelete}
                            className="hover:bg-destructive/10 border-destructive/30 text-destructive hover:text-destructive"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            삭제
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} 