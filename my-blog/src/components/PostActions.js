'use client'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

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
        <div className="p-6 border-t flex gap-2 justify-end">
            <Button asChild variant="outline">
                <Link href={`/post/${postId}/edit`}>수정</Link>
            </Button>
            <Button 
                variant="destructive" 
                onClick={handleDelete}
            >
                삭제
            </Button>
        </div>
    );
} 