export async function deletePost(postId: string, returnPath: string): Promise<void> {
    if (!confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
        return;
    }

    if (!postId) {
        console.error("Post ID is missing.");
        alert("Không thể xóa bài viết: ID không hợp lệ.");
        return;
    }

    try {
        const response = await fetch(`/api-v1/posts/delete-post/${postId}`, {
            method: "POST",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Xóa bài viết không thành công");
        }

        alert("Đã xóa bài viết thành công!");
        window.location.href = returnPath;

    } catch (error) {
        console.error("Lỗi khi xóa bài viết:", error);
        alert(`Đã xảy ra lỗi: ${error instanceof Error ? error.message : "Lỗi không xác định"}`);
    }
}